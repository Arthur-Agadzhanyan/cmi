let htmlForDownload = ""

function determinant(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    var d;
    d = a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32;
    d = d - a13 * a22 * a31 - a12 * a21 * a33 - a11 * a23 * a32;

    return d
}

function generateMatrix(delta, a11, a12, a13, a21, a22, a23, a31, a32, a33, d) {
    return `
        <div class="result_delta">
        <p>${delta} =</p>
           <table>
           <tr><td>${a11}</td><td>${a12}</td><td>${a13}</td>
        <tr><td>${a21}</td><td>${a22}</td><td>${a23}</td>
           <tr><td>${a31}</td><td>${a32}</td><td>${a33}</td>
            </table>
            <p>= ${d}</p>
        </div>
    `
}

function button1() {
    let d;
    let x1, x2, x3;

    const a11 = +document.getElementById("a11").value
    const a12 = +document.getElementById("a12").value
    const a13 = +document.getElementById("a13").value
    const b1 = +document.getElementById("b1").value

    const a21 = +document.getElementById("a21").value
    const a22 = +document.getElementById("a22").value
    const a23 = +document.getElementById("a23").value
    const b2 = +document.getElementById("b2").value

    const a31 = +document.getElementById("a31").value
    const a32 = +document.getElementById("a32").value
    const a33 = +document.getElementById("a33").value
    const b3 = +document.getElementById("b3").value

    let resultString = ""

    const dArguments = [a11, a12, a13, a21, a22, a23, a31, a32, a33]
    d = determinant(...dArguments);
    resultString = resultString + generateMatrix("∆", ...dArguments, d)

    const d1Arguments = [b1, a12, a13, b2, a22, a23, b3, a32, a33]
    d1 = determinant(...d1Arguments);
    resultString = resultString + generateMatrix("∆ <i>1</i>", ...d1Arguments, d1)

    const d2Arguments = [a11, b1, a13, a21, b2, a23, a31, b3, a33]
    d2 = determinant(...d2Arguments);
    resultString = resultString + generateMatrix("∆ <i>2</i>", ...d2Arguments, d2)

    const d3Arguments = [a11, a12, b1, a21, a22, b2, a31, a32, b3]
    d3 = determinant(...d3Arguments);
    resultString = resultString + generateMatrix("∆ <i>3</i>", ...d3Arguments, d3)

    x1 = d1 / d;
    x2 = d2 / d;
    x3 = d3 / d;

    if (d === 0) {
        x1 = 0;
        x2 = 0;
        x3 = 0;
    }

    const resultDiv = document.getElementById("result")

    const varsDiv = document.getElementById("vars")

    resultDiv.innerHTML = `Результат вычислений: <br><br> ${resultString}`

    varsDiv.innerHTML =  `
        <p>x<i>1</i> = ${d1} / ${d} = ${x1}</p>
        <p>x<i>2</i> = ${d2} / ${d} = ${x2}</p>
        <p>x<i>3</i> = ${d3} / ${d} = ${x3}</p>
    `

    markdownForDownload = resultDiv.innerHTML + varsDiv.innerHTML
}

const button = document.getElementById("get_res_btn")

button.addEventListener("click", button1)

const tabBtn = document.querySelector(".tab_btn")
const formPanel = document.querySelector(".form_panel")
const resultsField = document.querySelector(".results_field")

const modal = document.querySelector(".modal")
const lessonBtn = document.querySelector(".lesson_btn")
const closeBtn = document.querySelector(".btn_cls")

tabBtn.addEventListener("click", ()=>{
    if(tabBtn.textContent === "Скрыть панель"){
        tabBtn.textContent = "Раскрыть панель"
    }else{
        tabBtn.textContent = "Скрыть панель"
    }
     formPanel.classList.toggle("form_panel_closed")
     setTimeout(()=>{
        formPanel.classList.toggle("dn")
     },100)
     resultsField.classList.toggle("results_field_fullscreen")
})

lessonBtn.addEventListener("click", ()=>{
    modal.classList.toggle("dn")
})

closeBtn.addEventListener("click", ()=>{
    modal.classList.add("dn")
})