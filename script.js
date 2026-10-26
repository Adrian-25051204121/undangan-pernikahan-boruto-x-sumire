const CONFIG = {
  storageKey: "ucapan-boruto-sumire",
};
const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const guestName = document.getElementById("guestName");
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");
const wCount = document.getElementById("wCount");
const wEmpty = document.getElementById("wEmpty");
const params = new URLSearchParams(location.search);
const namaTamu = params.get("to");

if (namaTamu !== null && namaTamu.trim() !== "") {
  guestName.textContent = namaTamu.trim();
}
openBtn.addEventListener("click", function () {
  cover.classList.add("hide");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);
});

function ambilUcapan() {
  const data = localStorage.getItem(CONFIG.storageKey);

  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

function tampilkanUcapan() {
  const daftar = ambilUcapan();
  wishList.innerHTML = "";

  for (let i = 0; i < daftar.length; i++) {
    const kotak = document.createElement("div");
    kotak.className = "wish";

    const nama = document.createElement("b");
    nama.textContent = daftar[i].name;

    const status = document.createElement("span");
    status.className = "tag";
    status.textContent = daftar[i].status;

    const isi = document.createElement("p");
    isi.textContent = daftar[i].msg;

    kotak.appendChild(nama);
    kotak.appendChild(status);
    kotak.appendChild(isi);
    wishList.appendChild(kotak);
  }

  wCount.textContent = daftar.length;
  wEmpty.hidden = daftar.length > 0;
}

wishForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (wishForm.checkValidity() === false) {
    wishForm.classList.add("was-validated");
    return;
  }

  const daftar = ambilUcapan();
  daftar.unshift({
    name: document.getElementById("wName").value.trim(),
    status: document.getElementById("wStatus").value,
    msg: document.getElementById("wMsg").value.trim(),
  });
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(daftar.slice(0, 50)));

  wishForm.reset();
  wishForm.classList.remove("was-validated");
  tampilkanUcapan();
});

tampilkanUcapan();
