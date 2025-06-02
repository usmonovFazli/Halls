const pool = require('../config/db');


const createBooking = async (req , res) => {
    try{
        const{
            hall_id,
            user_id,
            booking_date,
            people_count,
            full_name,
            phone
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO bookings (
                hall_id, user_id, booking_date, people_count, full_name, phone
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [hall_id, user_id, booking_date, people_count, full_name, phone]
        );

        res.status(201).json({
            message: 'Бронирование успешно создано',
            booking: result.rows[0]
        });

    }catch(err){
        console.error('Ошибка при создании брони:', err.message);
        res.status(500).json({error: 'Ошибка сервера при бронировании' })
    };
};


const getBookingsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(`
            SELECT 
                b.id AS booking_id,
                b.booking_date,
                b.people_count,
                b.status,
                b.full_name,
                b.phone,
                h.id AS hall_id,
                h.name AS hall_name,
                h.address,
                h.price_per_seat,
                h.phone AS hall_phone
            FROM bookings b
            JOIN halls h ON b.hall_id = h.id
            WHERE b.user_id = $1
            ORDER BY b.booking_date DESC
        `, [userId]);

        res.json(result.rows);

    } catch (err) {
        console.error('Ошибка при получении броней по userId:', err.message);
        res.status(500).json({ error: 'Ошибка сервера при получении броней' });
    }
};

const cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        // Проверка: существует ли бронь и не завершена/отменена
        const existing = await pool.query(`
            SELECT status FROM bookings WHERE id = $1
        `, [id]);

        if (existing.rowCount === 0) {
            return res.status(404).json({ error: 'Бронь не найдена' });
        }

        const currentStatus = existing.rows[0].status;
        if (['cancelled', 'completed'].includes(currentStatus)) {
            return res.status(400).json({ error: `Бронь уже ${currentStatus}` });
        }

        // Отмена
        const result = await pool.query(`
            UPDATE bookings
            SET status = 'cancelled'
            WHERE id = $1
            RETURNING *
        `, [id]);

        res.json({
            message: 'Бронь отменена',
            booking: result.rows[0]
        });

    } catch (err) {
        console.error('Ошибка при отмене брони:', err.message);
        res.status(500).json({ error: 'Ошибка сервера при отмене брони' });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                b.id AS booking_id,
                h.name AS hall_name,
                d.name AS district_name,
                u.full_name AS user_name,
                b.full_name AS guest_name,
                b.phone AS guest_phone,
                b.booking_date,
                b.people_count,
                b.status
            FROM bookings b
            JOIN halls h ON b.hall_id = h.id
            JOIN users u ON b.user_id = u.id
            JOIN districts d ON h.district_id = d.id
            ORDER BY b.booking_date DESC
        `);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Ошибка при получении всех бронирований:', err.message);
        res.status(500).json({ error: 'Ошибка сервера при получении бронирований' });
    }
};

const getBookingById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный ID брони' });
    }

    try {
        const result = await pool.query(`
            SELECT 
                b.id AS booking_id,
                b.booking_date,
                b.people_count,
                b.status,
                b.full_name AS guest_name,
                b.phone AS guest_phone,
                h.name AS hall_name,
                h.address,
                h.price_per_seat,
                h.phone AS hall_phone,
                d.name AS district_name,
                u.full_name AS user_name
            FROM bookings b
            JOIN halls h ON b.hall_id = h.id
            JOIN users u ON b.user_id = u.id
            JOIN districts d ON h.district_id = d.id
            WHERE b.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Бронь не найдена' });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error('Ошибка при получении брони по ID:', err.message);
        res.status(500).json({ error: 'Ошибка сервера при получении брони' });
    }
};


module.exports= {
    createBooking,
    getBookingsByUserId,
    cancelBooking,
    getAllBookings,
    getBookingById
};