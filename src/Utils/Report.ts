import colors from "colors";

export default abstract class Report {
    public static verbose(message: string, ...args: any[]): void {
        console.log("%s %s", colors.white("verbose"), colors.gray(args.join(" ")));
    }
}
