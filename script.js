document.addEventListener('DOMContentLoaded', function() {
    // Email subscription form submission
    document.getElementById('subscribeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var email = this.querySelector('input[type="email"]').value;
        console.log("Email submitted:", email);

        // AJAX request to server
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "subscribe_endpoint", true); // Replace 'subscribe_endpoint' with your server endpoint
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Thank you for subscribing! We will notify you when we launch.");
                document.getElementById('subscribeForm').reset();
            } else if (xhr.readyState === 4) {
                alert("There was an error submitting your request. Please try again.");
            }
        };
        xhr.send(JSON.stringify({ email: email }));
    });

    // Login popup handling
    const loginButton = document.querySelector('.login-btn');
    const loginPopup = document.getElementById('loginPopup');
    const closeButton = document.querySelector('.close-btn');
    const body = document.body; // Get the body element to apply no-scroll

    loginButton.addEventListener('click', function() {
        loginPopup.style.display = 'flex'; // Show the popup
        body.classList.add('no-scroll'); // Stop scrolling on the body
    });

    closeButton.addEventListener('click', function() {
        loginPopup.style.display = 'none'; // Hide the popup when close button is clicked
        body.classList.remove('no-scroll'); // Allow scrolling again
    });

    // Function to simulate connecting a wallet
    window.connectWallet = function(walletName) {
        console.log("Connecting to:", walletName);
        // Hide the popup after selection
        loginPopup.style.display = 'none';
        body.classList.remove('no-scroll'); // Allow scrolling again
    }

    // Proposals data and update function
    const proposals = [
        {
            type: "General DAO Proposal",
            title: "Proposal for New Art Auction Rules",
            description: "This proposal aims to revise the rules for art auction submissions to ensure greater artist diversity and representation in our marketplace.",
            favorPercentage: 75,
            againstPercentage: 25
        },
        {
            type: "User Proposal",
            title: "Proposal for Lowering Commission Fees",
            description: "This proposal suggests lowering commission fees on sales to encourage more artists to join our platform.",
            favorPercentage: 55,
            againstPercentage: 45
        },
        {
            type: "General DAO Proposal",
            title: "Proposal to Extend Auction Duration",
            description: "A proposal to extend the duration of auctions from 7 to 10 days to allow more time for bids.",
            favorPercentage: 45,
            againstPercentage: 55
        }
    ];

    let currentProposalIndex = 0;

    function updateProposal() {
        const proposal = proposals[currentProposalIndex];
        document.getElementById('proposalTag').textContent = proposal.type;
        document.getElementById('proposalTitle').textContent = proposal.title;
        document.getElementById('proposalDescription').textContent = proposal.description;
        document.getElementById('voteFavor').textContent = `${proposal.favorPercentage}% In Favor`;
        document.getElementById('voteFavor').style.width = `${proposal.favorPercentage}%`;
        document.getElementById('voteAgainst').textContent = `${proposal.againstPercentage}% Against`;
        document.getElementById('voteAgainst').style.width = `${proposal.againstPercentage}%`;

        currentProposalIndex = (currentProposalIndex + 1) % proposals.length;
    }

    // Initialize the first proposal
    updateProposal();

    // Update proposal every 7 seconds
    setInterval(updateProposal, 7000);
});