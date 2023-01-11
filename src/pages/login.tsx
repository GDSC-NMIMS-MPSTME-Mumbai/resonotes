import { signIn, getCsrfToken, getProviders, useSession } from "next-auth/react";
import Image from "next/image";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next/types";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);
    return {
        props: {
            providers,
            csrfToken,
        },
    };
}

const Signin: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken, providers }) => {

    const { data: session } = useSession();

    const router = useRouter()

    if (session) {
        router.push("/dashboard");
    }

    return (
        <div style={{ overflow: "hidden", position: "relative" }}>
            <div className={styles.wrapper} />
            <div className={styles.content}>
                <div className={styles.cardWrapper}>
                    <Image
                        src="/logo_big.png"
                        width={196}
                        height={64}
                        alt="App Logo"
                        style={{ height: "85px", marginBottom: "20px" }}
                    />
                    <div className={styles.cardContent}>
                        <input
                            name="csrfToken"
                            type="hidden"
                            defaultValue={csrfToken}
                        />
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <div
                                    key={provider.name}
                                    style={{ marginBottom: 0 }}
                                >
                                    <button onClick={() => signIn(provider.id)}>
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <img
                src="/login_pattern.svg"
                alt="Pattern Background"
                className={styles.styledPattern}
            />
        </div>
    );
};

export default Signin;
