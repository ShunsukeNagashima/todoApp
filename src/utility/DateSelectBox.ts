export const createDate = () => {
  const isLeapYear = (year: number) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  const countDatesOfFeb = (year: number) => isLeapYear(year) ? 29 : 28;


  const createOption = (id: string, startNum: number, endNum: number, current:number ) => {
    const selectDom = document.getElementById(id)!;
    let option = '';
    let optionDom = '';
    for (let i = startNum; i <= endNum; i++) {
      if (i === current) {
        option = '<option value="' + i + '" selected>' + i + '</option>';
      } else {
        option = '<option value="' + i + '">' + i + '</option>';
      }
      optionDom += option;
    }
    selectDom.insertAdjacentHTML('beforeend', optionDom);
  }

  // DOM
  const yearBox = document.getElementById('year')! ;
  const monthBox = document.getElementById('month')!;
  const dateBox = document.getElementById('date')!;

  // 日付データ
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;
  const thisDate = today.getDate();

  let datesOfYear= [31, countDatesOfFeb(thisYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // イベント
    monthBox.addEventListener('change', e => {
        dateBox.innerHTML = '';
        const selectedMonth = (e.target! as HTMLInputElement).value;
        createOption('date', 1, datesOfYear[parseInt(selectedMonth) - 1], 1);
    });

    yearBox.addEventListener('change', e => {
        monthBox.innerHTML = '';
        dateBox.innerHTML = '';
        const updatedYear = (e.target! as HTMLInputElement).value;
        datesOfYear = [31, countDatesOfFeb(parseInt(updatedYear)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        createOption('month', 1, 12, 1);
        createOption('date', 1, datesOfYear[0], 1);
    });

    // ロード時
    createOption('year', thisYear, thisYear + 5, thisYear);
    createOption('month', 1, 12, thisMonth);
    createOption('date', 1, datesOfYear[thisMonth - 1], thisDate);
}