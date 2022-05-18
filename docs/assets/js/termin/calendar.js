KaToolsV1.ce_define("leu-calendar",
    /**
     * @param openHours {KaToolsV1.openhours}
     * @param $tpl {KaV1Renderer}
     * @param $this {HTMLElement}
     */
    (openHours, $tpl, $this) => {
        console.log(openHours);
        let scope = {
            $on:{
                change: () => {
                    $this.value = [];
                    $this.value = scope.selected;
                    $this.dispatchEvent(new Event("change"));
                }
            },
            $fn: {
                select: (day) => {
                    console.log("Select", day)
                    if (typeof scope.selected[day.toString()] !== "undefined") {
                        delete scope.selected[day.toString()];
                    } else {
                        if (Object.keys(scope.selected).length < 3) {
                            scope.selected[day.toString()] = scope.$fn.getOpenHoursForDate(day)[0];
                            console.log("set", day.toString())
                        }
                    }
                    $this.value = [];
                    $this.value = scope.selected;
                    $this.dispatchEvent(new Event("change"));
                    console.log(scope.selected);
                    $tpl.render(scope);
                },
                more: () => {
                    scope.showWeeks += 4;
                    scope.calendar = KaToolsV1.date.getCalendar(null, scope.showWeeks);
                    $tpl.render(scope);
                },
                dateFmt: (date, type = "default") => {
                    if (type === "default")
                        return new Intl.DateTimeFormat([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',}).format(new Date(date));
                },
                getOpenHoursForDate: (date) => {
                    return openHours.getOpenHoursForDate(date).map((item) => `${item.from.toString('H:i')} - ${item.till.toString('H:i')}`);
                }
            },
            showWeeks: 6,
            days: [
                leu_translate('Mo'), leu_translate('Di'), leu_translate('Mi'),
                leu_translate('Do'), leu_translate('Fr'), leu_translate('Sa'), leu_translate('So')],
            calendar: KaToolsV1.date.getCalendar(null, 6),
            startDay: 0,
            selected: {},
            openHours: openHours
        }
        $tpl.render(scope);
    }, KaToolsV1.html`<div class="row">

        <div class="col-lg-6 col-xl-5">

            <div ka:for="let curWeek of calendar" class="row">
                <div ka:if="curWeek.type === 'month'" class="fw-bold text-center mt-3">[[ new Intl.DateTimeFormat([], {month: 'long', year: 'numeric'}).format(curWeek.date)]]</div>

                <div class="col" ka:if="curWeek.type === 'month'" ka:for="let day of days">[[day]]</div>

                <div ka:if="curWeek.type === 'week'" ka:for="let cday of curWeek.days" class="col ratio ratio-1x1 m-1" style="min-height: 30px">

                    <button ka:if="cday !== null && openHours.getOpenHoursForDate(cday).length === 0" type="button" class="rounded border btn disabled p-0 fw-light" style="min-height: 30px">
                        <span class="m-1">[[  cday.getDate() ]]</span>
                    </button>
                    <button ka:if="cday !== null && openHours.getOpenHoursForDate(cday).length > 0" type="button" class="w-100 h-100 border rounded p-0 btn"
                            kap:classlist:bg-soft-danger="Object.keys(selected).length > 2 && typeof selected[cday.toString()] === 'undefined' "
                            kap:classlist:btn-primary="typeof selected[cday.toString()] !== 'undefined'"
                            kap:classlist:bg-white="typeof selected[cday.toString()] === 'undefined'"
                            kap:on:click="$fn.select(cday)" style="min-height: 30px">
                        <span class="m-1 fw-bold">[[  cday.getDate() ]]</span>

                    </button>


                </div>

            </div>
            <div class="row p-1">
                <button type="button" class="btn btn-outline-secondary w-100 p-1" kap:on:click="$fn.more()">[[leu_translate('Später')]]</button>
            </div>
            <div>

            </div>

        </div>
        <div class="col-lg-6 col-xl-7 align-self-end">
            <div class="bottom-0 end-0 start-0 ms-lg-3 mt-4 mb-5" ka:if="Object.keys(selected).length > 0">
                <h4>[[leu_translate('Ihre Terminvorschläge')]]</h4>
                <div class="row mt-3" ka:for="let dateStr in selected">

                    <div class="col">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" kap:options="$fn.getOpenHoursForDate(dateStr)" kap:bind="selected[dateStr]">

                          </select>
                          <label for="floatingSelect">[[ $fn.dateFmt(dateStr) ]]</label>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>`)
