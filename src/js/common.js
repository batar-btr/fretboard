// =================================================================
//                            PRELOADER
// =================================================================
const preloder = document.getElementById('preloader');

function hidePreloader() {
    preloader.classList.add('hidden');
    preloader.classList.remove('visible');
}

preloader.addEventListener('click', hidePreloader);

console.log(preloader);


// =================================================================
//                            PRELOADER
// =================================================================


const scaleLength = 25.5;


const getNotes = () => ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

let scaleIntervals =  {
    Major: [2, 2, 1, 2, 2, 2], // Ionian
    Dorian: [2, 1, 2, 2, 2, 1],
    Phrygian: [1, 2, 2, 2, 1, 2],
    Lydian: [2, 2, 2, 1, 2, 2],
    Mixolydian: [2, 2, 1, 2, 2, 1],
    Minor: [2, 1, 2, 2, 1, 2],
    Locrian: [1, 2, 2, 1, 2, 2],
    MinorPentatonic: [3, 2, 2, 3],
    BluesMajor: [2, 1, 1, 3, 2],
    BluesMinor: [3, 2, 1, 1, 3]
    // Blues Minor: 1-b3-4-b5-5-b7
};

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
    let fretsSum12 = fret12.reduce((a, b) => a + b)
    let fretsPercent12 = fret12.map(e => +(e / fretsSum12 * 100).toFixed(2))

    let fretsSum = fretsSize.reduce((a, b) => a + b)
    let fretsPercent = fretsSize.map(e => +(e / fretsSum * 100).toFixed(2))
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
            // fret.classList.add('active');
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
const switchFretsSize = document.getElementById('switch-frets-size') //--------12/24 btn------

const tuneSelect = document.getElementById('tune')
const scaleSelect = document.getElementById('scale')
const keySelect = document.getElementById('keyNote')

const rootStrings = document.getElementById('rootstrings')

const notesNavigation = document.querySelector('.notes-navigation')

const allFretNotes = document.querySelectorAll('.fretboard span')



function hideAll() {
    allFretNotes.forEach(note => note.classList.remove('active'));
    nnBtns.forEach(btn => btn.classList.remove('active'));
}
function showAll() {
    allFretNotes.forEach(note => note.classList.add('active'));
    nnBtns.forEach(btn => btn.classList.add('active'));
}

function mouseEnter() {
    let noteName = this.dataset.note;
    allFretNotes.forEach(note => {
        if(noteName === note.dataset.name) {
            note.classList.add('hl');
        }
    })

}
function mouseOut() {
    let noteName = this.dataset.note;
    allFretNotes.forEach(note => {
        if(noteName === note.dataset.name) {
            note.classList.remove('hl');
        }
    })
}

function setVisibleNotes(e) {
    if(e.target.tagName !== 'BUTTON') return;
    const button = e.target;
    button.classList.toggle('active')
    let targetNotesArray = [...allFretNotes].filter(note => note.dataset.name === button.dataset.note);
    targetNotesArray.forEach(span => span.classList.toggle('active'))
}

function switchSize() {
    const fretBoard = document.querySelector('.fretboard');
    fretBoard.classList.toggle('full-size')
    this.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
}

function selectScale() {
    let intervals = scaleIntervals[this.value]
    let key = keySelect.value;
    let notes = getNotes();
    let keyNotes = [...notes.splice(notes.indexOf(key)),...notes]
    let binaryArr = [1].concat(...intervals.map(step=> { //make binary arr[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
        let arr = new Array(step).fill(0)
        arr[arr.length -1] = 1
        return arr;
    }))

    let targetNotes = keyNotes.filter((item, idx)=> binaryArr[idx])
    console.log(targetNotes)
}

function setKeyNote() {
    const key = this.value;
    let notes = getNotes();
    let keyNotes = [...notes.splice(notes.indexOf(key)),...notes]
    console.log(keyNotes)
    console.log(scaleSelect.value)
}


hideAllBtn.addEventListener('click',hideAll)
showAllBtn.addEventListener('click',showAll)
notesNavigation.addEventListener('click',setVisibleNotes)
switchFretsSize.addEventListener('click', switchSize)
scaleSelect.addEventListener('change',selectScale)
keySelect.addEventListener('change',setKeyNote)


switchFrets.addEventListener('click', e => {
    let elem = document.querySelector('.fretboard')
    elem.classList.toggle('natural')
})

tuneSelect.addEventListener('change', e => {
    let tune = tuneSelect.options[tuneSelect.options.selectedIndex].value;
    [...document.querySelectorAll('#rootstrings div span')].reverse().forEach((e, i) => {
        e.innerText = tuning[tune][i]
    });
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
nnBtns.forEach(btn=> btn.addEventListener('mouseenter',mouseEnter));
nnBtns.forEach(btn=> btn.addEventListener('mouseout',mouseOut));


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







