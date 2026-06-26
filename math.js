/**
 * KaTeX 描画
 */

function renderMath(element) {

    if (!window.renderMathInElement) {

        console.error("KaTeX が読み込まれていません");

        document.getElementById("debugMathJax").textContent =
            "KaTeX NG";

        return;
    }

    renderMathInElement(

        element,

        {

            delimiters: [

                {
                    left: "$$",
                    right: "$$",
                    display: true
                },

                {
                    left: "$",
                    right: "$",
                    display: false
                }

            ],

            throwOnError: false

        }

    );

    document.getElementById("debugMathJax").textContent =
        "KaTeX OK";

}