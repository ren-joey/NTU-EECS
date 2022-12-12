import { BedAliasString } from './BedAliasString';
import { BedClassCodeString } from './BedClassCodeString';
import { DeptCodeString } from './DeptCodeString';
import { FlagString } from './FlagString';
import { IsolateReasonCodeString } from './IsolateReasonCodeString';

export interface AccountBedHistory {
    AccountIDSE: string;
    BedIDSE: string;
    TransferInDate: Date;
    TransferOutDate: Date;
    DeptCode: DeptCodeString;
    BedClassCode: BedClassCodeString;
    IsolateReasonCode: IsolateReasonCodeString;
}

export interface BedClassCode {
    BedClassCode: BedClassCodeString;
    BedClassChinName: string;
    IsolateFlag: FlagString;
    DayStayFlag: FlagString;
    ICUFlag: FlagString;
    BedAlias: BedAliasString;
}

export interface IsolateReason {
    BedClassCode: BedClassCodeString;
    IsolateReasonCode: IsolateReasonCodeString;
    IsolateReasonChinName: string;
}