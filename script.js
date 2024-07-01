document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for responsive navbar
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.closebtn');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.style.width = '250px';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.style.width = '0';
        });
    }

    // Login popup handling
    const loginButton = document.querySelector('.login-btn');
    const loginPopup = document.getElementById('loginPopup');
    const closeButton = document.querySelector('.close-btn');
    const body = document.body; // Get the body element to apply no-scroll

    function showLoginPopup() {
        if (loginPopup) {
            loginPopup.style.display = 'flex'; // Show the popup
            body.classList.add('no-scroll'); // Stop scrolling on the body
        }
    }

    if (loginButton && loginPopup && closeButton) {
        loginButton.addEventListener('click', showLoginPopup);

        closeButton.addEventListener('click', function() {
            loginPopup.style.display = 'none'; // Hide the popup when close button is clicked
            body.classList.remove('no-scroll'); // Allow scrolling again
        });
    }

    // Function to simulate connecting a wallet
    window.connectWallet = function(walletName) {
        console.log("Connecting to:", walletName);
        // Hide the popup after selection
        if (loginPopup) {
            loginPopup.style.display = 'none';
            body.classList.remove('no-scroll'); // Allow scrolling again
        }
    };

    // Add event listeners to all buttons that require login
    const buttons = document.querySelectorAll('.vote-button, .submit-btn, .login-btn');

    buttons.forEach(button => {
        button.addEventListener('click', showLoginPopup);
    });

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
