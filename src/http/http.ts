import {Snowflake} from "../core/message";

export abstract class Gateway {
    public static version: number = 7;
    public static cdn: string = "https://cdn.discordapp.com";
    public static api: string = "https://discordapp.com/api";
    public static invite: string = "https://discord.gg";
}

export abstract class ApiEndpoints {
    public static botGateway(): string {
        return `${Gateway.api}/gateway/bot`;
    }
}

export enum ImageFormat {
    GIF = "gif",
    WEBP = "webp"
}

const allowedImageFormats = [
    "webp",
    "png",
    "jpg",
    "gif"
];

// TODO: Dummy data
const allowedImageSizes = [
    16,
    32,
    64,
    128,
    256,
    512
];

export abstract class CdnEndpoints {
    public static emoji(emojiId: Snowflake, format: string = "png"): string {
        return `${Gateway.cdn}/emojis/${emojiId}.${format}`;
    }

    public static makeImageUrl(root: string, format: ImageFormat, size: number): string {
        if (format && !allowedImageFormats.includes(format)) {
            throw new Error(`[CdnEndpoints.makeImageUrl] Invalid image format: ${format}`);
        }
        else if (size && !allowedImageSizes.includes(size)) {
            throw new RangeError(`[CdnEndpoints.makeImageUrl] Invalid image size: ${size}`);
        }

        return `${root}.${format}${size ? `?size=${size}` : ""}`;
    }

    public static asset(name: string): string {
        return `${Gateway.cdn}/assets/${name}`;
    }

    public static defaultAvatar(num: number): string {
        return `${Gateway.cdn}/embed/avatars/${num}.png`;
    }

    public static avatar(userId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/avatars/${userId}/${hash}`, format, size);
    }

    public static icon(guildId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/icons/${guildId}/${hash}`, format, size);
    }

    public static appIcon(clientId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/app-icons/${clientId}/${hash}`, format, size);
    }

    public static appAsset(clientId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/app-assets/${clientId}/${hash}`, format, size);
    }

    public static GdmIcon(channelId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/channel-icons/${channelId}/${hash}`, format, size);
    }

    public static splash(guildId: Snowflake, hash: string, size: number, format: ImageFormat = ImageFormat.WEBP): string {
        return CdnEndpoints.makeImageUrl(`${Gateway.cdn}/splashes/${guildId}/${hash}`, format, size);
    }

    public static invite(code: string): string {
        return `${Gateway.invite}/${code}`;
    }
}