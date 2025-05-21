import { easeInOut, motion } from "motion/react"
import teamOne from "../../assets/images/teamOne.jpg"

const Banner = () => {
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col justify-center items-center lg:flex-row-reverse">
                    <div className="flex-1">

                        <motion.img
                            animate={{ y: [50, 100, 50] }}
                            transition={{ duration: 10, repeat: Infinity }}

                            src={teamOne}
                            className="rounded-t-3xl rounded-br-3xl max-w-80 border-l-5 border-b-5  border-[#3c65f5] shadow-2xl"
                        />

                        <motion.img
                            animate={{ x: [100, 150, 100] }}
                            transition={{ duration: 10, delay: 5, repeat: Infinity }}

                            src={teamOne}
                            className="rounded-t-3xl rounded-br-3xl max-w-80 border-l-5 border-b-5  border-[#3c65f5] shadow-2xl"
                        />

                    </div>
                    <div className="flex-1">

                        <motion.h1
                            animate={{ x: 50 }}
                            transition={{ duration: 2, delay: 1, ease: "easeInOut", repeat: Infinity }}
                            className="text-5xl font-bold"
                        >
                            Latest{" "}
                            <motion.span
                                animate={{
                                    color: ["#38BDF8", "#8B5CF6", "#10B981"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                }}
                            >
                                Jobs
                            </motion.span>{" "}
                            For You!
                        </motion.h1>


                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;