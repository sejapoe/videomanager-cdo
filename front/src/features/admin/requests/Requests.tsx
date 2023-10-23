import {ContentLayout} from "../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export const Requests = () => {
    return <ContentLayout title="Запросы">
        <div>
            <div className="w-full flex flex-1 justify-center">
                <Button
                    size="sm"
                    startIcon={solid("plus")}
                >
                    Создать
                </Button>
            </div>
            {/*<table></table>*/}
        </div>
    </ContentLayout>
}