import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {AlertTriangle} from "lucide-react";
import {Container} from "@mui/material";

const NotFound = () => {
    return (
        <Container maxWidth="lg" sx={{display: "flex", justifyContent: "center", marginTop: "4rem"}}>
            <motion.div
                className="flex flex-col items-center justify-center h-screen text-center px-4"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <AlertTriangle className="text-red-500" size={64}/>
                <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-500 mt-2">Oops! The page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </motion.div>
        </Container>
    );
};

export default NotFound;
