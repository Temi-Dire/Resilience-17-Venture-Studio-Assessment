import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieChart: React.FC = () => {
    const noOfDebits = 150000;
    const noOfCredits = 240000;
    const totalTransactions = noOfDebits + noOfCredits;
    const getTransactionsPercentage = (transaction: string) => {
        if (transaction === "credits") {
            return (noOfCredits && totalTransactions ? noOfCredits / totalTransactions : 0) * 100;
        }
        if (transaction === "debits") {
            return (noOfDebits && totalTransactions ? noOfDebits / totalTransactions : 0) * 100;
        }
    };
    return (
        <Pie
            options={{
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                maintainAspectRatio: false, // Allow chart to have a custom height
                responsive: true, // Ensure chart responds to container size changes
            }}
            data={{
                labels: ["Credits", "Debits"],
                datasets: [
                    {
                        label: "Transactions",
                        data: [getTransactionsPercentage("credits"), getTransactionsPercentage("debits")],
                        backgroundColor: ["#758CD7", "#A0D7AB"],
                        borderWidth: 1,
                        hoverOffset: 4,
                    },
                ],
            }}
        />
    );
};
