<script>

// ======================
// AMBIL DATA CHECKOUT
// ======================

const cart =
JSON.parse(localStorage.getItem('checkout')) || [];

const summary =
document.getElementById('summary');

let total = 0;

summary.innerHTML = "";

cart.forEach((item,index)=>{

  const subtotal =
  item.harga * item.qty;

  total += subtotal;

  summary.innerHTML += `

    <div class="summary-item">

      <div>

        <b>${item.nama}</b><br>

        ${item.qty} x
        Rp ${item.harga.toLocaleString()}

      </div>

      <div style="text-align:right;">

        Rp ${subtotal.toLocaleString()}

        <br><br>

        <button
          onclick="removeItem(${index})"
          style="
            background:red;
            color:white;
            border:none;
            padding:6px 10px;
            border-radius:6px;
            cursor:pointer;
          "
        >
          Hapus
        </button>

      </div>

    </div>

  `;

});

document.getElementById('total')
.innerText =
'Total: Rp ' + total.toLocaleString();


// ======================
// HAPUS ITEM
// ======================

function removeItem(index){

  cart.splice(index,1);

  localStorage.setItem(
    'checkout',
    JSON.stringify(cart)
  );

  location.reload();

}


// ======================
// METODE PEMBAYARAN
// ======================

function showPayment(){

  const metode =
  document.getElementById("bayar").value;

  const info =
  document.getElementById("paymentInfo");

  const detail =
  document.getElementById("paymentDetail");

  info.style.display = "block";

  if(metode === "DANA"){

    detail.innerHTML = `
      <p>Nomor DANA:</p>

      <h2 style="color:#00d0ff;">
        081234567890
      </h2>

      <p>A/N Nauli Wear</p>
    `;

  }

  else if(metode === "OVO"){

    detail.innerHTML = `
      <p>Nomor OVO:</p>

      <h2 style="color:violet;">
        081234567890
      </h2>

      <p>A/N Nauli Wear</p>
    `;

  }

  else if(metode === "QRIS"){

    detail.innerHTML = `
      <p>Scan QRIS:</p>

      <img
        src="qris.png"
        style="
          width:220px;
          margin-top:15px;
          border-radius:10px;
        "
      >
    `;

  }

  else if(metode === "Transfer Bank"){

    detail.innerHTML = `
      <p>Bank BCA</p>

      <h2 style="color:#c9a36b;">
        1234567890
      </h2>

      <p>A/N Nauli Wear</p>
    `;

  }

  else if(metode === "COD"){

    detail.innerHTML = `
      <h3>Bayar di Tempat (COD)</h3>
    `;

  }

}


// ======================
// CHECKOUT WHATSAPP
// ======================

function checkoutWA(){

  const nama =
  document.getElementById('nama').value;

  const wa =
  document.getElementById('wa').value;

  const alamat =
  document.getElementById('alamat').value;

  const bayar =
  document.getElementById('bayar').value;

  const ekspedisi =
  document.getElementById('ekspedisi').value;

  const bukti =
  document.getElementById('bukti').files[0];

  if(!nama || !wa || !alamat){

    alert("Lengkapi data dulu");

    return;

  }

  if(
    bayar !== "COD"
    &&
    !bukti
  ){

    alert(
      "Upload bukti pembayaran dulu"
    );

    return;

  }

  let text =
  `Halo Nauli Wear%0A%0A`;

  text += `Nama: ${nama}%0A`;
  text += `No WA: ${wa}%0A`;
  text += `Alamat: ${alamat}%0A`;
  text += `Ekspedisi: ${ekspedisi}%0A`;
  text += `Pembayaran: ${bayar}%0A%0A`;

  text += `Pesanan:%0A`;

  cart.forEach(item => {

    text +=
    `- ${item.nama} x${item.qty}%0A`;

  });

  text +=
  `%0ATotal: Rp ${total.toLocaleString()}`;

  alert(
    "Checkout berhasil"
  );

  window.open(
    `https://wa.me/6281234567890?text=${text}`
  );

}


// ======================
// API WILAYAH
// ======================

const provinsi =
document.getElementById('provinsi');

const kota =
document.getElementById('kota');

const kecamatan =
document.getElementById('kecamatan');

async function loadProvinsi(){

  const res = await fetch(
    'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
  );

  const data = await res.json();

  provinsi.innerHTML =
  '<option>Pilih Provinsi</option>';

  data.forEach(p => {

    provinsi.innerHTML += `
      <option value="${p.id}">
        ${p.name}
      </option>
    `;

  });

}

provinsi.onchange = async function(){

  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.value}.json`
  );

  const data = await res.json();

  kota.innerHTML = '';

  data.forEach(k => {

    kota.innerHTML += `
      <option value="${k.id}">
        ${k.name}
      </option>
    `;

  });

}

kota.onchange = async function(){

  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.value}.json`
  );

  const data = await res.json();

  kecamatan.innerHTML = '';

  data.forEach(k => {

    kecamatan.innerHTML += `
      <option>
        ${k.name}
      </option>
    `;

  });

}

loadProvinsi();

</script>