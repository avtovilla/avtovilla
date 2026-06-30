module.exports = {
  afterCreate(event) {
    const { result } = event;
    console.log("!!! РАБОТАЕТ AFTERCREATE. ID ЗАЯВКИ:", result.id);

    // Временная проверка: просто выведем данные в консоль
    console.log("Данные заказа:", result.name, result.phone, result.car);
  }
};