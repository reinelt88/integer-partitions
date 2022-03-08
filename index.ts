class IntegerPartitions {

    public partitions: any = [];

    constructor(n: number){
        this.buildPartitions(n)
    }

    private getPartitionArr(p: any, n: number) {
        let arr: any = [];
        for(let i = 0; i < n; i++)
            arr.push(p[i]);
        this.partitions.push(arr);
    }

    private buildPartitions(n: number) {
        
        let p = new Array(n);
        let k = 0;
        p[k] = n;
    
        while (true) {

            this.getPartitionArr(p, k + 1);
            let rem_val = 0;
            while (k >= 0 && p[k] == 1) {
                rem_val += p[k];
                k--;
            }
    
            if (k < 0)
                return;
    
            p[k]--;
            rem_val++;
    
            while (rem_val > p[k]) {
                p[k + 1] = p[k];
                rem_val = rem_val - p[k];
                k++;
            }
    
            p[k + 1] = rem_val;
            k++;
        }
    }

    private getProductArr() {
        let arr: any[] = [];
        for (let entry of this.partitions) {
            let total = entry.reduce( (x: number, y: number) => {
                return x*y;
            });
            arr.push(total);
        }

        return arr;
    }

    private cleanArr(arr: any) {
        return arr.filter(function(item: number, pos: number) {
            return arr.indexOf(item) == pos;
        })
    }

    private sort(arr: any) {
        return arr.sort((a: number, b: number) => { return a-b })
    }

    private getMedian(arr: any) {
        const sorted = arr.slice().sort((a: number, b: number) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2);
        }
        return sorted[middle].toFixed(2);
    }

    private getAverage(arr: any) {
        const sum = arr.reduce((a: number, b: number) => a + b, 0);
        return (sum/arr.length).toFixed(2) || 0;
    }

    private getRange(arr: any) {
        return arr[arr.length - 1] - 1 || 0;
    }

    public build() {
        let arr = this.sort(this.cleanArr(this.getProductArr()))
        const range = this.getRange(arr);
        const average = this.getAverage(arr);
        const median = this.getMedian(arr);
        return `Range: ${range} Average: ${average} Median: ${median}`;
    }

}

export function part(n: number) {
    let ip = new IntegerPartitions(n);
    return ip.build()
}

console.log(part(9));
