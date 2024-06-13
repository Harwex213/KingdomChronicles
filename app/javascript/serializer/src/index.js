// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
// https://github.dev/RioloGiuseppe/byte-serializer/tree/master/src

/** После размышлений я понял что для сераилазатора карты мне не нужен ультра-мега-пупер дженерик сериализатор
 *  Карта - это двумерный массив из простых объектов, которые будут хранить только числа (enum'ки можно делать
 *  стринговыми, а при сериализаци/десериализации делать числовыми) - тогда это свёдется к простому использованию
 *  Uint32Array!
 */

