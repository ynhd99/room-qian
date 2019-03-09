/* eslint-disable */

/**
 * 获取不同表单项真正的值，兼容Input，Radio，Select等
 */
export function getValueFromEvent(e) {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' || target.type === 'radio' ? target.checked : target.value;
}
