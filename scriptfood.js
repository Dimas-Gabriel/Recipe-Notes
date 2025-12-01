//local STORAGE
const STORAGE_KEY = "recipe_food_v1";
let recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const qs = sel => document.querySelector(sel);


//drag and drop + preview gambar
function initImageUpload() {
    const box = qs("#uploadBox");
    const fileInput = qs("#fileInput");
    const preview = qs("#previewImage");
    const text = qs("#uploadText");

    let base64Image = "";

    function loadFile(file) {
        if (!file || !file.type.startsWith("image")) {
            alert("File harus gambar!");
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            base64Image = e.target.result;
            preview.src = base64Image;
            preview.style.display = "block";
            text.style.display = "none";
        };
        reader.readAsDataURL(file);
    }

    box.onclick = () => fileInput.click();
    box.ondragover = e => e.preventDefault();
    box.ondrop = e => {
        e.preventDefault();
        loadFile(e.dataTransfer.files[0]);
    };

    fileInput.onchange = () => loadFile(fileInput.files[0]);

    return () => base64Image;
}


//form tambah dan edit
function initForm() {
    const form = qs("#foodForm");
    if (!form) return;

    const getImageBase64 = initImageUpload();

    const editIndex = localStorage.getItem("editIndexFood");

    // data edit mode
    if (editIndex !== null) {
        const r = recipes[editIndex];

        qs("#title").value = r.title;
        qs("#tools").value = r.tools;
        qs("#method").value = r.method;

        const preview = qs("#previewImage");
        preview.src = r.image;
        preview.style.display = "block";
        qs("#uploadText").style.display = "none";
    }

    // save form
    form.onsubmit = e => {
        e.preventDefault();

        const data = {
            title: qs("#title").value.trim(),
            tools: qs("#tools").value.trim(),
            method: qs("#method").value.trim(),
            image: getImageBase64() || (editIndex !== null ? recipes[editIndex].image : "")
        };

        // Edit mode
        if (editIndex !== null) {
            recipes[editIndex] = data;
            localStorage.removeItem("editIndexFood");  // FIXED
        } 
        // Tambah mode
        else {
            recipes.push(data);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));

        window.location.href = "index.html";
    };
}

document.addEventListener("DOMContentLoaded", initForm);
