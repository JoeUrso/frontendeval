function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
    const mapArr: U[] = [];

    for (let i = 0; i < arr.length; i++) {
        mapArr.push(callback(arr[i]));
    }

    return mapArr;
}

export default map;
