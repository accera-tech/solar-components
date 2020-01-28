export function isIE() {

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');

  return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
}
