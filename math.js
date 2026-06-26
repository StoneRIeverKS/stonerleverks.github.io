/**
 * 数式描画用
 * MathJax が読み込まれた後に呼び出す
 */

async function renderMath(elements) {

    if (!window.MathJax) {

        console.error("MathJax が読み込まれていません。");

        document.getElementById("debugMathJax").textContent =
            "NG";

        return;
    }

    try {

        document.getElementById("debugMathJax").textContent =
            "OK (" + (MathJax.version || "unknown") + ")";

        if (MathJax.typesetClear) {
            MathJax.typesetClear(elements);
        }

        if (MathJax.typesetPromise) {

            await MathJax.typesetPromise(elements);

        } else {

            console.error("typesetPromise が存在しません。");
            console.log(MathJax);

            document.getElementById("debugError").textContent =
                "MathJax.typesetPromise が存在しません。";

        }

    } catch (e) {

        console.error(e);

        document.getElementById("debugError").textContent =
            e.toString();

    }

}