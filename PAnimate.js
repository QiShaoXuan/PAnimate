class PAnimate {
  constructor(container, poem) {
    this.container = container
    this.poem = poem


    const p = poem.map((p, pIndex) => `<p>${p.split('').map((t, textIndex) => `<span class="text-item" style="${this.setItemStyles()}" id="text-${pIndex}-${textIndex}">${t}</span>`).join('')}</p>`).join('')

    container.innerHTML = p
    this.getArr()
  }

  getArr() {
    this.shuffleArr = [].map.call(this.container.querySelectorAll('span'), (dom) => dom.getAttribute('id'))

    this.shuffleArr = this.shuffle(this.shuffleArr)
  }

  shuffle(arr) {
    let array = arr
    let index = array.length

    while (index) {
      index -= 1
      let randomInedx = Math.floor(Math.random() * index)
      let middleware = array[index]
      array[index] = array[randomInedx]
      array[randomInedx] = middleware
    }

    return array
  }

  animate(numOrRandom = 1) {
    if (this.shuffleArr.length === 0) return

    let textNum = numOrRandom
    if (typeof numOrRandom === 'boolean') {
      textNum = numOrRandom ? this.random(4, 1) : 1
    }

    // const timeout = typeof numOrRandom === 'boolean' ? this.random(1000,2000) : 1 * 1000
    const timeout = 1.5 * 1000
    this.shuffleArr.forEach((id, index) => {
      if (index < textNum) {
        let dom = this.container.querySelector(`#${id}`)
        dom.style.transform = 'translateY(0px)'
        dom.style.opacity = '1'
      }
    })

    this.shuffleArr.splice(0, textNum)

    setTimeout(() => {
      this.animate(numOrRandom)
    }, timeout)
  }

  setItemStyles() {
    const styles = {
      transform: `translateY(-${this.random(50, 150)}px)`,
      opacity: 0,
      transition: `all ${this.random(1, 3, true)}s`,
      display:'inline-block'
    }
    return Object.entries(styles).map(v => `${v.join(':')};`).join('')
  }

  random(max, min, point = false) {
    if (point) {
      return (Math.random() * (max - min + 1) + min).toFixed(1)
    } else {
      return parseInt(Math.random() * (max - min + 1) + min, 10)
    }
  }
}
