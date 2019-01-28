class PAnimate {
  constructor(container, poem) {
    this.container = container
    this.poem = poem
    const p = poem.map((p, pIndex) => `<p>${p.split('').map((t, textIndex) => `<span class="text-item" id="text-${pIndex}-${textIndex}">${t}</span>`).join('')}</p>`).join('')

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

  animate(numOrRandom) {
    if (this.shuffleArr.length === 0) return

    let textNum = numOrRandom
    if(typeof numOrRandom === 'boolean'){
      textNum =  numOrRandom?parseInt(Math.random() * (5 - 1 + 1) + 1, 10):1
    }

    const timeout = 1 * 1000

    this.shuffleArr.forEach((id, index) => {
      if (index < textNum) {
        this.container.querySelector(`#${id}`).classList.add('text-animate')
      }
    })

    this.shuffleArr.splice(0,textNum)

    setTimeout(() => {
      this.animate(numOrRandom)
    }, timeout)
  }
}
