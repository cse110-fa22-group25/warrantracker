window.addEventListener('DOMContentLoaded', init)

if (window.localStorage.getItem('cnt') === null) {
  window.localStorage.setItem('cnt', 0)
}

let cnt = Number(window.localStorage.getItem('cnt'))

/**
 * Initialize page after load -- test change
 */
function init () {
  const incBtn = document.getElementById('inc-btn')
  const incDis = document.getElementById('inc-dis')
  incDis.textContent = cnt
  incBtn.addEventListener('click', () => {
    cnt++
    window.localStorage.setItem('cnt', cnt)
    incDis.textContent = cnt
  })
}
