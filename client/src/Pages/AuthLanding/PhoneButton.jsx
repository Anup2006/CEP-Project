import {motion} from "framer-motion";
import {Phone} from "lucide-react";

export default function PhoneButton(){
    return(
        <>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className="flex justify-center items-center w-full h-11 border-black rounded-sm border-2 hover:bg-gray-50">
                    <Phone className="w-5 h-5 mr-2 text-green-600" />
                    Continue with Phone
                </button>
            </motion.div>
        </>
    )
}