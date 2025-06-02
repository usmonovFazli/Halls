const pool = require('../config/db');
const upload = require('../middleware/upload');

const createHall = async (req, res) => {
    try {
        const {
            name,
            district_id,
            address,
            capacity,
            price_per_seat,
            phone,
            owner_id,
        } = req.body;

        const result = await pool.query(
            `
                INSERT INTO halls
                (name , district_id, address, capacity, price_per_seat, phone, owner_id )
                VALUES ($1, $2, $3,$4, $5, $6, $7)
                RETURNING *
            `,
            [name, district_id, address, capacity, price_per_seat, phone, owner_id]
        );

        res.status(201).json({
            message: 'банкетный зал добавлен',
            hall: result.rows[0]
        });

    } catch (err) {
        console.error('ошибка при создании банкетного зала', err);
        res.status(500).json({ error: 'ошибка в сервере' });
    };
};

// routes/halls.js (или controller)
// const upload = async (req , res) => {

    
//     //../middleware/upload
    
//     router.post(
//       '/:id/images',
//       authenticateToken,
//       authorizeRoles('admin', 'owner'),
//       upload.array('images', 5), // до 10 файлов
//       async (req, res) => {
//         const { id } = req.params;
//         const files = req.files;
    
//         if (!files || files.length === 0) {
//           return res.status(400).json({ error: 'Файлы не загружены' });
//         }
    
//         try {
//           const insertPromises = files.map(file => {
//             return pool.query(
//               `INSERT INTO hall_images (hall_id, image_path) VALUES ($1, $2)`,
//               [id, file.path]
//             );
//           });
    
//           await Promise.all(insertPromises);
    
//           res.status(201).json({ message: 'Изображения успешно добавлены' });
//         } catch (err) {
//           console.error('Ошибка при загрузке изображений', err.message);
//           res.status(500).json({ error: 'Ошибка сервера при загрузке изображений' });
//         }
//       }
//     );
// }

const uploadHallImages = async (req, res) => {
  const { id } = req.params;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Файлы не загружены' });
  }

  try {
    const insertPromises = files.map(file => {
      return pool.query(
        `INSERT INTO hall_images (hall_id, image_path) VALUES ($1, $2)`,
        [id, file.path]
      );
    });

    await Promise.all(insertPromises);

    res.status(201).json({ message: 'Изображения успешно добавлены' });
  } catch (err) {
    console.error('Ошибка при загрузке изображений', err.message);
    res.status(500).json({ error: 'Ошибка сервера при загрузке изображений' });
  }
};

const deleteHallImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    // Получаем путь к файлу из базы
    const result = await pool.query(
      `SELECT image_path FROM hall_images WHERE id = $1`,
      [imageId]
    );

    const image = result.rows[0];

    if (!image) {
      return res.status(404).json({ error: 'Изображение не найдено' });
    }

    const imagePath = path.resolve(image.image_path);

    // Удаляем файл
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error('Ошибка при удалении файла:', err);
        return res.status(500).json({ error: 'Не удалось удалить файл' });
      }

      // Удаляем запись из базы
      await pool.query(`DELETE FROM hall_images WHERE id = $1`, [imageId]);

      res.status(200).json({ message: 'Изображение успешно удалено' });
    });

  } catch (err) {
    console.error('Ошибка при удалении изображения:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getAllHalls = async (req, res) => {
    try {
        const result = await pool.query(`
                SELECT 
                    h.id,
                    h.name,
                    h.address,
                    h.capacity,
                    h.price_per_seat,
                    h.phone,
                    h.status,
                    d.name AS district_name ,
                    u.full_name AS owner_name
                FROM halls h 
                JOIN districts d ON h.district_id = d.id
                JOIN users u ON h.owner_id = u.id  
            `);

        res.json(result.rows);
    } catch (err) {
        console.error('ERROR в получшении БЗ', err.message);
        res.status(500).json({ error: 'ERROR in server в БЗ' });
    };
};

const getHallById = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Неверный ID зала' });
    };
    try {
        const hallResult = await pool.query(`
            SELECT 
            h.id,
            h.name,
            h.address,
            h.capacity,
            h.price_per_seat,
            h.phone,
            h.status,
            d.name AS district_name,
            u.full_name AS owner_name,
            u.phone AS owner_phone
            FROM halls h
            JOIN districts d ON h.district_id = d.id
            JOIN users u ON h.owner_id = u.id
            WHERE h.id = $1

            `, [id]);
        
            if (hallResult.rows.length === 0) {
                return res.status(404).json({error: 'БЗ не наеден'});
            };

            const imagesResult = await pool.query(
                `SELECT image_url FROM hall_images WHERE hall_id = $1`,
                [id]
            );

            const hall = hallResult.rows[0];
            hall.images = imagesResult.rows.map(row => row.image_url);

            res.status(200).json(hall);


    } catch (err) {
        console.error('ошибка при получении зала по ID ', err.message);
        res.status(500).json({error: 'Ошибка сервера при получении зала'});
    };
};

const updateHall = async (req , res) => {
    const { id } = req.params;
    const {
        name,
        address,
        capacity,
        price_per_seat,
        phone,
        district_id
    } = req.body;


    if(isNaN(id)) {
        return res.status(400).json({error: 'Неверный ID зала'})
    };

    try {
        const chek = await pool.query(`SELECT * FROM halls WHERE id = $1` , [id]);
        if (chek.rows.length === 0){
            return res.status(404).json('Зал не найен');
        };

        const result = await pool.query(`
            UPDATE halls
            SET 
                name = COALESCE($1, name),
                address = COALESCE($2, address),
                capacity = COALESCE($3, capacity),
                price_per_seat = COALESCE($4, price_per_seat),
                phone = COALESCE($5, phone),
                district_id = COALESCE($6, district_id)
            WHERE id = $7
            RETURNING *
            `, [name , address , capacity , price_per_seat , phone , district_id, id]
        );

        res.status(200).json({
            message: 'Зал успешно добавлен',
            hall: result.rows[0]
        });
    } catch (err) {
        console.error('Ошибки при обнавлении зал', err.message);
        res.status(500).json({error: 'Ошибка сервера при обновлении зала'});
    };
};



const deletHall = async (req , res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.status(404).json({error: 'Некорректный ID зала'});
    };

    try {
        const result = pool.query(`DELETE FROM halls WHERE id = $1 RETURNING *`, [id]);

        if(result.rowCount === 0){
            return res.status(404).json({error: 'Зал не наеден'});
        };

        res.status(200).json({message: 'Зал успешно удалён', deleted: result.rows[0]});
    } catch (err) {
        console.error('Ошибка при удалении зала:', err.message);
        res.status(500).json({ error: 'Ошибка сервера при удалении зала' });
    }
};

module.exports = {
    createHall,
    getAllHalls,
    getHallById,
    updateHall,
    deletHall,
    uploadHallImages,
    deleteHallImage
};