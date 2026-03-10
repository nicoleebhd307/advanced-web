import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

class LunarYear {
  day: number;
  month: number;
  year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /* ================= CORE FUNCTIONS ================= */

  private jdFromDate(dd: number, mm: number, yy: number): number {
    let a = Math.floor((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    return (
      dd +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045
    );
  }

  private solar2lunar(timeZone: number) {
    const dayNumber = this.jdFromDate(this.day, this.month, this.year);
    return this.convertSolar2Lunar(dayNumber, timeZone);
  }

  private convertSolar2Lunar(
    dayNumber: number,
    timeZone: number
  ): {
    lunarDay: number;
    lunarMonth: number;
    lunarYear: number;
    lunarLeap: number;
  } {
    let k, monthStart, a11, b11;
    dayNumber = Math.floor(dayNumber);

    k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = this.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }

    a11 = this.getLunarMonth11(this.year, timeZone);
    b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
      lunarYear = this.year;
      a11 = this.getLunarMonth11(this.year - 1, timeZone);
    } else {
      lunarYear = this.year + 1;
      b11 = this.getLunarMonth11(this.year + 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    let diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) lunarLeap = 1;
      }
    }

    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

    return { lunarDay, lunarMonth, lunarYear, lunarLeap };
  }

  private getNewMoonDay(k: number, timeZone: number): number {
    let T = k / 1236.85;
    let T2 = T * T;
    let T3 = T2 * T;
    let dr = Math.PI / 180;

    let Jd1 =
      2415020.75933 +
      29.53058868 * k +
      0.0001178 * T2 -
      0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    let M =
      359.2242 +
      29.10535608 * k -
      0.0000333 * T2 -
      0.00000347 * T3;
    let Mpr =
      306.0253 +
      385.81691806 * k +
      0.0107306 * T2 +
      0.00001236 * T3;
    let F =
      21.2964 +
      390.67050646 * k -
      0.0016528 * T2 -
      0.00000239 * T3;

    let C1 =
      (0.1734 - 0.000393 * T) * Math.sin(dr * M) -
      0.4068 * Math.sin(dr * Mpr) +
      0.0161 * Math.sin(dr * 2 * Mpr) +
      0.0104 * Math.sin(dr * 2 * F);

    let deltat =
      T < -11
        ? 0.001 +
          0.000839 * T +
          0.0002261 * T2 -
          0.00000845 * T3
        : -0.000278 + 0.000265 * T + 0.000262 * T2;

    let JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }

  private getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    if (this.getSunLongitude(nm, timeZone) >= 9) {
      nm = this.getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  private getLeapMonthOffset(a11: number, timeZone: number): number {
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(
        this.getNewMoonDay(k + i, timeZone),
        timeZone
      );
    } while (arc !== last && i < 14);
    return i - 1;
  }

  private getSunLongitude(jdn: number, timeZone: number): number {
    let T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    let dr = Math.PI / 180;

    let M = 357.5291 + 35999.0503 * T;
    let L0 = 280.46645 + 36000.76983 * T;

    let DL = 1.9146 * Math.sin(dr * M);
    let L = (L0 + DL) * dr;
    L -= Math.PI * 2 * Math.floor(L / (Math.PI * 2));

    return Math.floor((L / Math.PI) * 6);
  }

  /* ================= CAN CHI ================= */

  private CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  private CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  private TUAN = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

  findLunarYearDetail(): string {
    const jd = this.jdFromDate(this.day, this.month, this.year);
    const l = this.solar2lunar(7);

    const canNam = this.CAN[(l.lunarYear + 6) % 10];
    const chiNam = this.CHI[(l.lunarYear + 8) % 12];

    const canNgay = this.CAN[(jd + 9) % 10];
    const chiNgay = this.CHI[(jd + 1) % 12];

    return `
      <table border="1" cellpadding="6" style="width:100%">
        <tr>
          <td>Thứ</td>
          <td style="color:red">${this.TUAN[jd % 7]}</td>
        </tr>
        <tr>
          <td>Âm lịch</td>
          <td style="color:red">${l.lunarDay}/${l.lunarMonth}/${l.lunarYear}</td>
        </tr>
        <tr>
          <td>Năm</td>
          <td style="color:red">${canNam} ${chiNam}</td>
        </tr>
        <tr>
          <td>Ngày</td>
          <td style="color:red">${canNgay} ${chiNgay}</td>
        </tr>
      </table>
    `;
  }
}

/* ================= COMPONENT ================= */

@Component({
  selector: 'app-exercise10',
  standalone: false,
  templateUrl: './exercise10.html',
  styleUrl: './exercise10.css',
})
export class Exercise10 {
  selectedDay = 15;
  selectedMonth = 5;
  selectedYear = 1986;

  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  lunarResult!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    for (let i = 1; i <= 31; i++) this.days.push(i);
    for (let i = 1; i <= 12; i++) this.months.push(i);
    for (let i = 1900; i <= 2100; i++) this.years.push(i);
  }

  convertToLunar() {
    const lunarYear = new LunarYear(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );

    this.lunarResult = this.sanitizer.bypassSecurityTrustHtml(
      lunarYear.findLunarYearDetail()
    );
  }
}
