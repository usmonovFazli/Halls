import React, { useState } from 'react';

const BookingForm = ({ hallId, onSubmit }) => {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    guest_count: '',
    booking_date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, hall_id: hallId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="full_name"
        placeholder="Ваше имя"
        value={form.full_name}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Телефон"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        name="guest_count"
        placeholder="Количество гостей"
        value={form.guest_count}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="date"
        name="booking_date"
        value={form.booking_date}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Отправить заявку
      </button>
    </form>
  );
};

export default BookingForm;
