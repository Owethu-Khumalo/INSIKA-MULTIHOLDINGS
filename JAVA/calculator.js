
 // =====================================
 // INSIKA MULTIHOLDINGS - LOAN CALCULATOR
 // =====================================

// Fixed monthly interest rate
const MONTHLY_INTEREST_RATE = 0.40;

const calculatorForm = document.getElementById("loanCalculator");

if (calculatorForm) {

    const loanAmountInput = document.getElementById("loanAmount");
    const repaymentPeriodInput = document.getElementById("repaymentPeriod");

    const monthlyPayment = document.getElementById("monthlyPayment");
    const resultLoanAmount = document.getElementById("resultLoanAmount");
    const totalInterest = document.getElementById("totalInterest");
    const totalRepayment = document.getElementById("totalRepayment");
    const resultTerm = document.getElementById("resultTerm");

    const calculatorError = document.getElementById("calculatorError");

    // Format amounts as South African Rand
    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(amount);
    }

    // Calculate loan repayment
    calculatorForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const principal = Number(loanAmountInput.value);
        const months = Number(repaymentPeriodInput.value);

        calculatorError.textContent = "";

        // Validate inputs
        if (
            loanAmountInput.value.trim() === "" ||
            repaymentPeriodInput.value === ""
        ) {
            calculatorError.textContent =
                "Please complete all fields.";
            return;
        }

        if (
            !Number.isFinite(principal) ||
            principal <= 0 ||
            !Number.isInteger(months) ||
            months < 1 ||
            months > 12
        ) {
            calculatorError.textContent =
                "Please enter a valid loan amount and repayment period.";
            return;
        }

        // Calculate 40% interest on the original amount each month
        const monthlyInterest = principal * MONTHLY_INTEREST_RATE;

        const interestAmount = monthlyInterest * months;

        const totalAmount = principal + interestAmount;

        // Divide total repayment into equal monthly instalments
        const monthlyAmount = totalAmount / months;

        // Display results
        monthlyPayment.textContent = formatCurrency(monthlyAmount);

        resultLoanAmount.textContent = formatCurrency(principal);

        totalInterest.textContent = formatCurrency(interestAmount);

        totalRepayment.textContent = formatCurrency(totalAmount);

        resultTerm.textContent =
            months + (months === 1 ? " Month" : " Months");

    });

    // Reset calculator
    calculatorForm.addEventListener("reset", function() {

        calculatorError.textContent = "";

        monthlyPayment.textContent = "R0.00";
        resultLoanAmount.textContent = "R0.00";
        totalInterest.textContent = "R0.00";
        totalRepayment.textContent = "R0.00";
        resultTerm.textContent = "0 Months";

    });

const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {

    applicationForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const feedback = document.getElementById("applicationFeedback");
        const submitButton = applicationForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        feedback.textContent = "";

        try {

            const formData = new FormData(applicationForm);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {

                feedback.textContent = "Your loan enquiry has been submitted successfully!";
                feedback.style.color = "green";

                applicationForm.reset();

            } else {

                throw new Error(result.message || "Submission failed.");

            }

        } catch (error) {

            feedback.textContent = "Unable to submit your enquiry. Please try again.";
            feedback.style.color = "red";

            console.error(error);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Submit Loan Enquiry";

        }

    });

}


}
