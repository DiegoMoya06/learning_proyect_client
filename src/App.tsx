import AppRoutes from "./components/AuthContext/AppRoutes.tsx";
import {AuthProvider} from "./components/AuthContext/AuthProvider.tsx";

function App() {
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}

export default App;
