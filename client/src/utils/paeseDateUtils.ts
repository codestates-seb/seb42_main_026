function parseDateUtils(props: Date) {
    const now = new Date(props);
    const MM = Number(now.getMonth()) < 10 ? `0${now.getMonth() + 1}` : now.getMonth();
    const dd = Number(now.getDate()) < 10 ? `0${now.getDate()}` : now.getDate();
    return `${MM}/${dd}`;
}

export default parseDateUtils