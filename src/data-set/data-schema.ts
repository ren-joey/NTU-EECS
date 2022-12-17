import { BedAliasString } from './BedAliasString';
import { BedClassCodeString } from './BedClassCodeString';
import { DeptCodeString } from './DeptCodeString';
import { FlagString } from './FlagString';
import { IsolateReasonCodeString } from './IsolateReasonCodeString';
import { SexString } from './SexString';

export interface PatientInfo {
    AcountID: string;
    FamilyName: string;
    GivenName: string;
    Sex: SexString;
    ChartNo: string;
    Birthday: Date;
    RegisterAddress: string;
    ContactAddress: string;
    DeadDate: Date | null;
}

export interface BedInfo {
    BedIDSE: string;
    WardCode: string;
    RoomCode: string;
    BedNo: string;
}

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