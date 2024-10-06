async function predictDiabetes() {
  const formData = {
    Pregnancies: document.getElementById("pregnancies").value,
    Glucose: document.getElementById("glucose").value,
    BloodPressure: document.getElementById("bloodPressure").value,
    SkinThickness: document.getElementById("skinThickness").value,
    Insulin: document.getElementById("insulin").value,
    BMI: document.getElementById("bmi").value,
    DiabetesPedigreeFunction: document.getElementById("dpf").value,
    Age: document.getElementById("age").value,
  };

  const response = await fetch(
    "https://diabetes-predication-api-99d19fe60c9f.herokuapp.com/diabetes_prediction",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const result = await response.text();
  document.getElementById("result").textContent = result;
}
