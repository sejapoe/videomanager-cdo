import {Link} from "react-router-dom";
import {PATH_PAGE} from "../../lib/react-router";
import {Layout} from "../../ui/layout/Layout.tsx";

export const NotFound = () => {
    return (
        <Layout title={"Страница не найдена"}>
            <div className="flex justify-center items-center">
                <Link to={PATH_PAGE.root} className="btn btn-sm btn-outline-primary">
                    Вернуться на домашнюю страницу
                </Link>
            </div>
        </Layout>
    )
}