const scaleLength = 25.5;


const getNotes = () => ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];



const tuning = {
    standard: ['E', 'A', 'D', 'G', 'B', 'E'],
    dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
    dropCsharp: ['C#', 'A', 'D', 'G', 'B', 'E'],
    dropC: ['C', 'G', 'C', 'F', 'A', 'D']
}

let getStringNotes = (stringName) => {
    let notes = getNotes()
    let position = notes.indexOf(stringName)
    let range = [...notes.splice(position + 1), ...notes]
    return [...range, ...range]
}

let getAllNotes = tuning => {
    return tuning.map(e => getStringNotes(e))
}

function getFretSize(scaleLength) {
    let scale = scaleLength
    let ratio = Math.pow(2, 1 / 12).toFixed(6)
    let fretsSize = new Array(24).fill(null).map(e => {
        let size = scale - scale / ratio
        scale = scale / ratio
        return size
    })

    let fret12 = fretsSize.splice(0,12)
    console.table(fret12)
    let fretsSum12 = fret12.reduce((a, b) => a + b)
    let fretsPercent12 = fret12.map(e => +(e / fretsSum12 * 100).toFixed(2))
    console.table(fretsPercent12)

    let fretsSum = fretsSize.reduce((a, b) => a + b)
    let fretsPercent = fretsSize.map(e => +(e / fretsSum * 100).toFixed(2))
    console.table(fretsPercent)
}

getFretSize(25.5 * 2.54)
// ==================================
//              INIT
// ==================================

function init(notes) {
    let freatboard = [...document.querySelectorAll('.fretboard>div')]
    freatboard.forEach((e, i) => {
        let string = [...e.querySelectorAll('span')]
        string.forEach((fret, index) => {
            fret.className = '';
            fret.classList.add(notes[i][index].toLowerCase());
            fret.dataset.name = notes[i][index].toLowerCase();
            fret.classList.add('active');
            fret.innerText = notes[i][index]
        })
    })
}

init(getAllNotes(tuning.standard).reverse())


// ==================================
//             Handler
// ==================================
// buttons------------------
const hideAllBtn = document.querySelector('.hide-all')
const showAllBtn = document.querySelector('.show-all')
const rootBtn = document.getElementById('rootnotes')
const nnBtns = document.querySelectorAll('.notes-navigation button') //nnBtns - notes navigation buttons

const switchFrets = document.getElementById('switch-frets-button')
const switchFretsSize = document.getElementById('switch-frets-size')
const tuneSelect = document.getElementById('tune')
const rootStrings = document.getElementById('rootstrings')

const notesNavigation = document.querySelector('.notes-navigation')
const allFretNotes = document.querySelectorAll('.fretboard span')

console.log(hideAllBtn)
console.log(showAllBtn)

function hideAll() {
    allFretNotes.forEach(note => note.classList.remove('active'));
    nnBtns.forEach(btn => btn.classList.remove('active'));
}
function showAll() {
    allFretNotes.forEach(note => note.classList.add('active'));
    nnBtns.forEach(btn => btn.classList.add('active'));
}

function setVisibleNotes(e) {
    if(e.target.tagName !== 'BUTTON') return;
    const button = e.target;
    button.classList.toggle('active')
    let targetNotesArray = [...allFretNotes].filter(note => note.dataset.name === button.dataset.note);
    targetNotesArray.forEach(span => span.classList.toggle('active'))
}

function switchSize() {
    // console.log('hi i`m switch size')
    const strings = [...document.querySelectorAll('.fretboard>div')];
    // strings.forEach(string => {
    //     const frets = string.querySelectorAll('div')
    //     frets.forEach((fret,i) => {
    //         if (i<12) return;
    //         fret.style.display='none'
    //     })
    // })
    const fretBoard = document.querySelector('.fretboard');
    fretBoard.classList.toggle('full-size')
}
hideAllBtn.addEventListener('click',hideAll)
showAllBtn.addEventListener('click',showAll)
notesNavigation.addEventListener('click',setVisibleNotes)
switchFretsSize.addEventListener('click', switchSize)

switchFrets.addEventListener('click', e => {
    let elem = document.querySelector('.fretboard')
    elem.classList.toggle('natural')
})

tuneSelect.addEventListener('change', e => {
    let tune = tuneSelect.options[tuneSelect.options.selectedIndex].value;
    [...document.querySelectorAll('#rootstrings div span')].reverse().forEach((e, i) => {
        e.innerText = tuning[tune][i]
    });
    console.log(tune)

    init(getAllNotes(tuning[tune]).reverse())
})

rootStrings.addEventListener('click', e => {
    if (e.target.tagName != 'INPUT') return;

    document.querySelector(`.${e.target.name}`).classList.toggle('active')

})

rootBtn.addEventListener('click', e => {
    [...document.querySelectorAll('.fretboard span')].forEach(e => {
        e.dataset.name.length > 1 ? e.classList.toggle('active') : false
    })
})


// ==================================
//             ReqAnFrm
// ==================================
// const logo = {
//     elem: document.getElementById('logo1'),
//     angle: 0,
//     shift: 0.4,
//     update() {
//         this.angle < 360 ? this.angle += this.shift : this.angle = 0;
//         this.elem.style.fill = `hsl(${this.angle},70%,50%)`
//     }
// }



// function animate() {
//     logo.update()
//     window.requestAnimationFrame(animate)
// }

// animate()







