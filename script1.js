// load data
const STORAGE_KEY = "recipe_food_v1";
let recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const qs = sel => document.querySelector(sel);
const listBox = qs("#recipeList");

// Tutup modal jika klik area kosong
document.addEventListener("click", function (e) {
    const modal = document.querySelector("#detailModal");
    if (e.target === modal) modal.style.display = "none";
});

// tampilka data
function renderRecipes() {
    if (!listBox) return;

    listBox.innerHTML = recipes.map((r, i) => `
        <div class="card">
            <img src="${r.image}">
            <h3>${r.title}</h3>

            <div class="button-group">
                <button onclick="openDetail(${i})" class="detail-btn">Detail</button>
                <button onclick="editRecipe(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteRecipe(${i})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join("");
}

//detail
function openDetail(i) {
    const r = recipes[i];

    qs("#detailImage").src = r.image;
    qs("#detailTitle").textContent = r.title;
    qs("#detailTools").textContent = r.tools;
    qs("#detailMethod").textContent = r.method;

    qs("#detailModal").style.display = "flex";
}

//edit recipe
function editRecipe(i) {
    localStorage.setItem("editIndexFood", i);
    window.location.href = "addfood.html";
}

//delete recipe
function deleteRecipe(i) {
    if (!confirm("Yakin ingin menghapus resep?")) return;

    recipes.splice(i, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    renderRecipes();
}

//start
document.addEventListener("DOMContentLoaded", renderRecipes);

// new food button
function newFood() {
    localStorage.removeItem("editIndexFood");
    window.location.href = "addfood.html";
}