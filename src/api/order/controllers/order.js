'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    // 1. Выполняем стандартное действие Strapi (создание записи в БД)
    const response = await super.create(ctx);

    // 2. Получаем данные из ответа
    const { data } = response;
    const { name, phone, car } = data.attributes;

    // 3. Отправляем в Telegram
    const BOT_TOKEN = '8920165983:AAHdRcjgIRsa8fEMYCdLrYV3IfRZXq9FoGA';
    const CHAT_ID = '8923508472';

    const message = `🔔 *Новая заявка с сайта!*\n🚗 Авто: ${car}\n👤 Имя: ${name}\n📱 Тел: ${phone}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      console.log("Уведомление в Telegram отправлено успешно!");
    } catch (err) {
      console.error("Ошибка при отправке в Telegram:", err);
    }

    return response;
  }
}));