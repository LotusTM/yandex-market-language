const t = require('tcomb')
const r = require('../tests/utils/refinements')

// A validation schemas for Yandex Market Language (YML)

const Cpa = t.enums.of([0, 1])
const Adult = t.Boolean

const DeliveryOptions = r.Maxlength(5)(t.list(t.interface({
  cost: t.Integer,
  days: t.union([t.enums.of(['']), t.Integer, t.tuple([t.Integer, t.Integer])]), // @todo maxvalue 31, output range as `"2-4"`, max interval 3 days
  'order-before': t.maybe(t.Integer) // @todo max 24
}, { name: 'Delivery Options', strict: true }), 'DeliveryOptionsObject'))

const PriceObject = t.interface({
  from: t.Boolean, // @todo Allowed only for specific categories
  value: t.Number
}, { name: 'PriceObject', strict: true })

// @todo Don't like that part, it involves repetition
const Price = t.union([t.Number, PriceObject])
Price.dispatch = (x) => t.Number.is(x)
  ? t.Number
  : PriceObject

const CurrencyId = t.enums.of(['RUB', 'RUR', 'UAH', 'BYN', 'KZT', 'USD', 'EUR'])

const Currencies = t.list(t.interface({
  id: CurrencyId,
  // @todo В качестве основной валюты (для которой установлено rate="1") могут быть использованы только рубль (RUR, RUB), белорусский рубль (BYN), гривна (UAH) или тенге (KZT).
  rate: t.maybe(t.union([t.Number, t.enums.of(['CBRF', 'NBU', 'NBK', 'СВ'])])),
  plus: t.maybe(t.Number)
}, { name: 'Currency', strict: true }), 'CurrenciesObject')

const Categories = t.list(t.interface({
  id: r.Maxlength(32)(t.String), // @todo can't be 0
  parentId: t.maybe(t.String), // @todo should exist in current list
  name: t.String
}, { name: 'Category', strict: true }), 'CategoriesObject')

const BaseOffer = t.interface({
  // attributes
  id: r.Maxlength(20)(t.String), // @todo only number and latin chars, should be unique among other offers
  available: t.maybe(t.Boolean), // Seems to be not used, when delivery-options specified
  bid: t.maybe(t.Integer),
  cbid: t.maybe(t.Integer),
  fee: t.maybe(t.Integer),
  group_id: t.maybe(r.Maxlength(9)(t.String)),
  // end attributes
  url: t.maybe(r.Maxlength(512)(r.Absoluteurl)), // @todo if contains non-latin chars, should be http, not https, or encoded
  price: Price,
  oldprice: t.maybe(t.Number), // @todo Should be higher than `Offer.price`
  currencyId: CurrencyId,
  categoryId: r.Maxlength(18)(t.String),
  // @todo JPEG or PNG only), mandatory for some categories
  picture: t.maybe(r.Maxlength(10)(t.list(r.Maxlength(512)(t.refinement(r.Absoluteurl, (p) =>
    r.Imagepath.is(p), 'Absoluteurl with Imagepath'
  ))))),
  store: t.maybe(t.Boolean),
  pickup: t.maybe(t.Boolean),
  delivery: t.maybe(t.Boolean),
  outlets: t.maybe(t.list(t.interface({
    id: t.String,
    instock: t.maybe(t.Integer),
    booking: t.maybe(t.Boolean)
  }, { name: 'OutletsObject', strict: true }))),
  'delivery-options': t.maybe(DeliveryOptions),
  // @todo dissalows words «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «только», «новинка», «new», «аналог», «заказ», «хит»;
  //       dissalows urls, emails;
  //       allows only tags <h3>...</h3>, <ul><li>...</li></ul>, <p>...</p>, <br/> encloused into `<![CDATA[Текст с использованием xhtml-разметки]]>``
  description: t.maybe(r.Maxlength(3000)(t.String)),
  sales_notes: t.maybe(r.Maxlength(50)(t.String)),
  'min-quantity': t.maybe(t.Integer),
  'step-quantity': t.maybe(t.Integer),
  manufacturer_warranty: t.maybe(t.Boolean),
  // @see https://cache-mskdataline04.cdn.yandex.net/download.cdn.yandex.net/support/ru/partnermarket/files/countries.pdf
  country_of_origin: t.maybe(t.enums.of(['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир', 'Американские Виргинские острова', 'Ангилья', 'Ангола', 'Андорра', 'Антигуа и Барбуда', 'Аргентина', 'Армения', 'Аруба', 'Афганистан', 'Багамские острова', 'Бангладеш', 'Барбадос', 'Бахрейн', 'Беларусь', 'Белиз', 'Бельгия', 'Бенин', 'Бермудские Острова', 'Болгария', 'Боливия', 'Босния и Герцеговина', 'Ботсвана', 'Бразилия', 'Британские Виргинские острова', 'Бруней', 'Буркина-Фасо', 'Бурунди', 'Бутан', 'Вануату', 'Ватикан', 'Великобритания', 'Венгрия', 'Венесуэла', 'Восточный Тимор', 'Вьетнам', 'Габон', 'Гайана', 'Гаити', 'Гамбия', 'Гана', 'Гваделупа', 'Гватемала', 'Гвинея', 'Гвинея-Бисау', 'Германия', 'Гибралтар', 'Гондурас', 'Гонконг', 'Гренада', 'Гренландия', 'Греция', 'Грузия', 'Дания', 'Демократическая Республика Конго', 'Джибути', 'Доминика', 'Доминиканская Республика', 'Египет', 'Замбия', 'Западная Сахара', 'Зимбабве', 'Йемен', 'Израиль', 'Индия', 'Индонезия', 'Иордания', 'Ирак', 'Иран', 'Ирландия', 'Исландия', 'Испания', 'Италия', 'Кабо-Верде', 'Казахстан', 'Каймановы острова', 'Камбоджа', 'Камерун', 'Канада', 'Катар', 'Кения', 'Кипр', 'Киргизия', 'Кирибати', 'Китай', 'Колумбия', 'Коморские острова', 'Коста-Рика', 'Кот-д’Ивуар', 'Куба', 'Кувейт', 'Лаос', 'Латвия', 'Лесото', 'Либерия', 'Ливан', 'Ливия', 'Литва', 'Лихтенштейн', 'Люксембург', 'Маврикий', 'Мавритания', 'Мадагаскар', 'Майотта', 'Макао', 'Македония', 'Малави', 'Малайзия', 'Мали', 'Мальдивы', 'Мальта', 'Марокко', 'Маршалловы острова', 'Мексика', 'Мозамбик', 'Молдова', 'Монако', 'Монголия', 'Мьянма', 'Намибия', 'Науру', 'Непал', 'Нигер', 'Нигерия', 'Нидерланды', 'Никарагуа', 'Новая Зеландия', 'Новая Каледония', 'Норвегия', 'Объединённые Арабские Эмираты', 'Оман', 'Острова Кука', 'Пакистан', 'Палау', 'Панама', 'Папуа - Новая Гвинея', 'Парагвай', 'Перу', 'Польша', 'Португалия', 'Республика Конго', 'Реюньон', 'Россия', 'Руанда', 'Румыния', 'Самоа', 'Сан-Марино', 'Сан-Томе и Принсипи', 'Саудовская Аравия', 'Свазиленд', 'Северная Корея', 'Сейшельские острова', 'Сенегал', 'Сент-Винсент и Гренадины', 'Сент-Китс и Невис', 'Сент-Люсия', 'Сербия', 'Сингапур', 'Сирия', 'Словакия', 'Словения', 'Сомали', 'Судан', 'Суринам', 'США', 'Сьерра-Леоне', 'Таджикистан', 'Таиланд', 'Танзания', 'Тёркс и Кайкос', 'Того', 'Тонга', 'Тринидад и Тобаго', 'Тувалу', 'Тунис', 'Туркменистан', 'Турция', 'Уганда', 'Узбекистан', 'Украина', 'Уругвай', 'Федеративные Штаты Микронезии', 'Фиджи', 'Филиппины', 'Финляндия', 'Франция', 'Французская Гвиана', 'Французская Полинезия', 'Хорватия', 'Центрально-Африканская Республика', 'Чад', 'Черногория', 'Чехия', 'Чили', 'Швейцария', 'Швеция', 'Шри-Ланка', 'Эквадор', 'Экваториальная Гвинея', 'Эритрея', 'Эстония', 'Эфиопия', 'ЮАР', 'Южная Корея', 'Ямайка', 'Япония'])),
  adult: t.maybe(Adult),
  age: t.maybe(t.interface({
    unit: t.enums.of(['year', 'month']),
    value: t.enums.of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) // @todo For unit=year only 0, 6, 12, 16, 18 allowed
  }, { name: 'AgeObject', strict: true })),
  barcode: t.maybe(t.list(r.Maxlength(12)(t.String))), // @todo can contains only numbers, without any other chars. Conforms to standards EAN-13, EAN-8, UPC-A, UPC-E
  cpa: t.maybe(Cpa),
  // @see https://yandex.ru/support/partnermarket/param.html for recommended params and their units
  param: t.maybe(t.list(t.interface({
    name: t.String,
    unit: t.maybe(t.String), // @todo mandatory if value numeric
    value: t.union([t.String, t.Number])
  }, { name: 'ParamObject', strict: true }))),
  expiry: t.maybe(t.String), // @todo should be in ISO8601
  weight: t.maybe(t.Number),
  dimensions: t.maybe(t.tuple([t.Number, t.Number, t.Number])),
  downloadable: t.maybe(t.Boolean),
  // @todo only ints and latin chars
  //       ids should be enlisted in that file
  rec: t.maybe(r.Maxlength(30)(t.list(r.Maxlength(20)(t.String)))),
  vat: t.maybe(t.enums.of([1, 'VAT_18', 3, 'VAT_18_118', 2, 'VAT_10', 4, 'VAT_10_110', 5, 'VAT_0', 6, 'NO_VAT']))
}, { name: 'Offer', strict: true })

// @todo Add support for special types:
//       https://yandex.ru/support/partnermarket/export/books.html
//       https://yandex.ru/support/partnermarket/export/audiobooks.html
//       https://yandex.ru/support/partnermarket/export/music-video.html
//       https://yandex.ru/support/partnermarket/export/medicine.html
//       https://yandex.ru/support/partnermarket/export/event-tickets.html
//       https://yandex.ru/support/partnermarket/export/tours.html

const SimplifiedOffer = BaseOffer.extend({
  name: r.Maxlength(120)(t.String),
  model: t.maybe(t.String),
  vendor: t.maybe(t.String),
  vendorCode: t.maybe(t.String)
}, { name: 'SimplifiedOffer', strict: true })

const FreeOffer = BaseOffer.extend({
  // attributes
  type: t.enums.of(['vendor.model']),
  // end attributes
  typePrefix: t.maybe(t.String),
  model: t.String,
  vendor: t.String,
  vendorCode: t.maybe(t.String)
}, { name: 'FreeOffer', strict: true })

const Offer = t.union([FreeOffer, SimplifiedOffer], 'Offer')
Offer.dispatch = (x) => x.type || x.typePrefix
  ? FreeOffer
  : SimplifiedOffer

const Offers = t.list(Offer, 'Offers')

const YML = t.interface({
  name: r.Maxlength(20)(t.String),
  company: t.String,
  url: r.Maxlength(50)(r.Absoluteurl),
  platform: t.maybe(t.String), // mostly not needed
  version: t.maybe(t.String), // mostly not needed
  agency: t.maybe(t.String), // mostly not needed
  email: t.maybe(t.String), // mostly not needed // @todo r.Email
  currencies: Currencies,
  categories: Categories,
  'delivery-options': DeliveryOptions,
  cpa: t.maybe(Cpa),
  adult: t.maybe(Adult),
  offers: Offers
}, { name: 'YML', strict: true })

module.exports = {
  Cpa,
  Adult,
  DeliveryOptions,
  CurrencyId,
  Currencies,
  Categories,
  Offer,
  Offers,
  YML
}
