// Declaring variables
const plan        = document.getElementById("plan");
const filterInput = document.querySelector("#filter_plans");
const addPlan     = document.getElementById("add_plan");
const plan_ul     = document.querySelector("#plan_ul");
const clear       = document.querySelector('#clear');

// DOM content Load event
document.addEventListener("DOMContentLoaded", function() {
  let plans;

  if (localStorage.getItem("plans") === null) {
    plans = [];
  } else {
    plans = JSON.parse(localStorage.getItem("plans"));
  }

  plans.forEach(function(plan) {
    //creating li element
    const li = document.createElement("li");
    //adding class to li
    li.className = "plan-item";
    //craete a span
    span = document.createElement("span");
    span.textContent = plan;
    // creating text node
    li.appendChild(span);
    // creating a link
    const a = document.createElement("a");
    //set link attribute
    a.setAttribute("href", "#");
    // adding link to li
    li.appendChild(a);
    // creating i element
    const i = document.createElement("i");
    // add class to i
    i.className = "fa fa-close";
    // add i to a
    a.appendChild(i);
    // add li to ul
    plan_ul.appendChild(li);
  });
});

// Add Plan to the UI
addPlan.addEventListener("click", function(e) {
  // taking value from input form and storing it in a variable(constant).
  const planText = plan.value;

  if(planText === '') {
      alert('Please add your plan!');
  } else {
    //creating li element
    const li = document.createElement("li");
    //adding class to li
    li.className = "plan-item";
    //craete a span
    span = document.createElement("span");
    span.textContent = planText;
    // creating text node
    li.appendChild(span);
    // creating a link
    const a = document.createElement("a");
    //set link attribute
    a.setAttribute("href", "#");
    // adding link to li
    li.appendChild(a);
    // creating i element
    const i = document.createElement("i");
    // add class to i
    i.className = "fa fa-close";
    // add i to a
    a.appendChild(i);
    // add li to ul
    plan_ul.appendChild(li);
    addPlantoLS(planText);
    // Clear Input after adding plan
    plan.value = "";
    plan.focus(); // set focus to the same input
  }

  e.preventDefault();
});

// Add plan to LocalStorage
function addPlantoLS(plan) {
  let plans;

  if (localStorage.getItem("plans") === null) {
    plans = [];
  } else {
    plans = JSON.parse(localStorage.getItem("plans"));
  }

  plans.push(plan);

  localStorage.setItem("plans", JSON.stringify(plans));
}

// Remove plan from the UI
plan_ul.addEventListener("click", function(e) {
  if (e.target.parentElement.parentElement.classList.contains("plan-item")) {
    e.target.parentElement.parentElement.remove();
    removeFromLS(e.target.parentElement.parentElement);
  }
});

// Remove from the localStorage
function removeFromLS(element) {
  let plans;

  if (localStorage.getItem("plans") === null) {
    plans = [];
  } else {
    plans = JSON.parse(localStorage.getItem("plans"));
  }

  plans.forEach(function(plan, index) {
    if (plan == element.textContent) {
      plans.splice(index, 1);
    }
  });

  localStorage.setItem("plans", JSON.stringify(plans));
}

clear.addEventListener('click', clearAll);

// Clear Everything from LS
function clearAll() {
    // Clear from DOM
    plan_ul.innerHTML= '';

    // Clear from LocalStorage
    localStorage.clear();
}

// Filter Plans by name
filterInput.addEventListener("keyup", function(e) {
  const typed_value = e.target.value.toLowerCase();

  document.querySelectorAll(".plan-item").forEach(function(item) {
    const DOMValue = item.firstChild.textContent.toLowerCase();

    if (DOMValue.indexOf(typed_value) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  console.log(e.target.value);
});