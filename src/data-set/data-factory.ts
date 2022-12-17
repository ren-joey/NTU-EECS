#!/usr/bin/env ts-node

import getRandomTaiwanAddress from '../utils/string/get-random-taiwan-address';
import { getRandomFamilyName, getRandomGivenName } from '../utils/string/get-random-chinese-name';
import getRandomTaiwanId from '../utils/string/get-random-taiwan-id';
import { PatientInfo } from './data-schema';

const factory = () => {
    const patientInfoArr: PatientInfo[] = [];
    const currentDateNumber = Date.parse(new Date().toString());

    for (let i = 0; i < 10; i++) {
        patientInfoArr.push({
            AcountID: getRandomTaiwanId(),
            FamilyName: getRandomFamilyName(),
            GivenName: getRandomGivenName(),
            Sex: Math.random() > 0.5 ? 'M' : 'F',
            Birthday: new Date(currentDateNumber - 500000000),
            ChartNo: '0000001',
            ContactAddress: getRandomTaiwanAddress(),
            DeadDate: null,
            RegisterAddress: getRandomTaiwanAddress()
        });
    }

    console.log(patientInfoArr);
};

(factory)();

export {};