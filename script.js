document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];
  const loading = document.getElementById("loading");
  const resultDiv = document.getElementById("summaryResult");

  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  loading.style.display = "block";
  resultDiv.textContent = "";

  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      resultDiv.textContent = `❌ Error: ${data.error}`;
    } else {
      resultDiv.textContent = data.summary;
    }
  } catch (err) {
    resultDiv.textContent = "❌ Error connecting to backend.";
  }

  loading.style.display = "none";
});
