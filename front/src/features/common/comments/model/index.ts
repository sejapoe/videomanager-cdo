import {User} from "../../users/model";
import {CommentResDto} from "../../../../api/Api.ts";
import {mapUser} from "../../../auth/api/getActivation.ts";

export type Comment = {
    id: number;
    timestamp: Date;
    text: string;
    author: User;
}

export const mapComment = (dto: CommentResDto): Comment => {
    return {
        author: mapUser(dto.author),
        text: dto.text,
        timestamp: new Date(dto.timestamp),
        id: dto.id
    };
};