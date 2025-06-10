import React from 'react';

const HallCard = ({ hall, onBook }) => {
  return (
    <div className="border rounded-lg shadow p-4 space-y-2">
      <h2 className="text-xl font-semibold">{hall.name}</h2>
      <p className="text-gray-600">{hall.district} — вместимость: {hall.capacity}</p>
      <p className="text-gray-800 font-bold">{hall.price_per_seat} сум / гость</p>
      {hall.phone && <p className="text-sm text-gray-500">☎ {hall.phone}</p>}
      {onBook && (
        <button
          onClick={() => onBook(hall)}
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Забронировать
        </button>
      )}
    </div>
  );
};

export default HallCard;
