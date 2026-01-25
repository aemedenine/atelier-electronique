const modal = document.getElementById("calcModal");
const modalContent = document.getElementById("calcContent");
const sortieBtn = document.getElementById("sortieBtn");

let activeBox = null;

document.querySelectorAll(".calculator-box").forEach(box => {
  box.addEventListener("click", () => {
    activeBox = box;

    // ننقل الـ box للأعلى داخل modal
    modalContent.innerHTML = "";
    modalContent.appendChild(box);

    modal.classList.add("active");
  });
});

sortieBtn.addEventListener("click", () => {
  modal.classList.remove("active");

  // نرجّع الـ box لمكانه الأصلي
  if (activeBox) {
    document.querySelector(".calculators-grid").appendChild(activeBox);
    activeBox = null;
  }
});
