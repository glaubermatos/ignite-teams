import { playersGetByGroup } from "./playersGetByGroup";

export async function playersByGroupAndTeam(group: string, team: string) {
    try {
        const storege = await playersGetByGroup(group);

        const players = storege.filter(player => player.team === team);

        return players;
    } catch (error) {
        throw error;
    }
}