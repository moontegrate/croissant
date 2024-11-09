// Interfaces
import { AutomationData } from "./interfaces";

export function sortAutomations(automations: AutomationData[], sortBy: string): AutomationData[] {
    switch (sortBy) {
        case 'Created date':
            return automations.sort((a, b) => {
                const dateA = new Date(a.createdDate).getTime();
                const dateB = new Date(b.createdDate).getTime();
                return dateA - dateB;
            });
        case 'Name A-Z':
            return automations.sort((a, b) => a.name.localeCompare(b.name));
        case 'Name Z-A':
            return automations.sort((a, b) => b.name.localeCompare(a.name));
        case 'Less clients':
            return automations.sort((a, b) => a.users - b.users);
        case 'More clients':
            return automations.sort((a, b) => b.users - a.users);
        case 'Best conversion':
            return automations.sort((a, b) => a.conversion - b.conversion);
        case 'Worst conversion':
            return automations.sort((a, b) => b.conversion - a.conversion);
        default:
            return automations;
    };
};