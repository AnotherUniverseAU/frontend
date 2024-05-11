///욕설 *로 변경
const censorWords = [
    'fuck',
    'shit',
    'bitch',
    'ass',
    'bastard',
    'damn',
    'hell',
    'dick',
    'pussy',
    'cock',
    'asshole',
    'motherfucker',
    'son of a bitch',
    'bullshit',
    'piss',
    '시발',
    '개새끼',
    '씨발',
    '병신',
    '지랄',
    '뻐큐',
    '썅',
]; // Add more words as needed
export const CensorText = (text: any) => {
    const regex = new RegExp(censorWords.join('|'), 'gi');
    return text.replace(regex, (match: any) => '*'.repeat(match.length));
};
