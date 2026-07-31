/**
 * Serialises structured data for injection into a <script> tag.
 *
 * JSON.stringify alone is not sufficient. If any value ever contains the
 * sequence "</script>", the browser ends the script element early and the
 * remainder is parsed as HTML — which is an XSS vector. Escaping the angle
 * brackets and ampersands as unicode escapes keeps the JSON semantically
 * identical while making that impossible.
 *
 * Today every value here is developer-authored and static, so this is defence
 * in depth. It matters the day someone feeds a testimonial or an env var into
 * structured data without thinking about it.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    // U+2028/U+2029 are valid inside JSON strings but are line terminators in
    // JavaScript, so they need escaping too. Built with String.fromCharCode
    // because a literal one written here would break this file's own parsing.
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029');
}
