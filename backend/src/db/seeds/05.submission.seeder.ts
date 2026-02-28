import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Submission } from '@/resource/submissions/entities/submission.entity';
import { SubmissionStatus } from '@/common/types/submission.type';
import { ProgrammingLanguage } from '@/common/types/assignment.type';

export default class SubmissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "submissions" RESTART IDENTITY CASCADE;');

    const userRepo = dataSource.getRepository('users');
    const assignmentRepo = dataSource.getRepository('assignments');

    const students = await userRepo.find({ where: { role: 'student' } });
    const assignments = await assignmentRepo.find();

    const repository = dataSource.getRepository(Submission);

    await repository.save([
      // Задание 1: Замыкания (JS) — student[0], v1 approved, v2 approved
      {
        assignmentId: assignments[0].id as string,
        studentId: students[0].id as string,
        version: 1,
        language: ProgrammingLanguage.JAVASCRIPT,
        status: SubmissionStatus.CHANGES_REQUESTED,
        fileName: 'counter.js',
        filePath: `uploads/${assignments[0].id}/${students[0].id}/v1_counter.js`,
        code: `function makeCounter(initial) {
  let count = initial;
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
}`,
      },
      {
        assignmentId: assignments[0].id as string,
        studentId: students[0].id as string,
        version: 2,
        language: ProgrammingLanguage.JAVASCRIPT,
        status: SubmissionStatus.APPROVED,
        fileName: 'counter.js',
        filePath: `uploads/${assignments[0].id}/${students[0].id}/v2_counter.js`,
        code: `function makeCounter(initial = 0) {
  let count = initial;
  return {
    increment() { count++; return count; },
    decrement() { 
      if (count > 0) count--;
      return count;
    },
    getCount() { return count; }
  };
}`,
      },

      // Задание 1: student[1], v1 in_review
      {
        assignmentId: assignments[0].id as string,
        studentId: students[1].id as string,
        version: 1,
        language: ProgrammingLanguage.JAVASCRIPT,
        status: SubmissionStatus.IN_REVIEW,
        fileName: 'counter.js',
        filePath: `uploads/${assignments[0].id}/${students[1].id}/v1_counter.js`,
        code: `function makeCounter(initial) {
  var count = initial || 0;
  return {
    increment: function() { count = count + 1; },
    decrement: function() { if(count > 0) { count = count - 1; } },
    getCount: function() { return count; }
  }
}`,
      },

      // Задание 1: student[2], v1 pending
      {
        assignmentId: assignments[0].id as string,
        studentId: students[2].id as string,
        version: 1,
        language: ProgrammingLanguage.JAVASCRIPT,
        status: SubmissionStatus.PENDING,
        fileName: 'counter.js',
        filePath: `uploads/${assignments[0].id}/${students[2].id}/v1_counter.js`,
        code: `const makeCounter = (initial) => {
  let count = initial;
  const increment = () => ++count;
  const decrement = () => { if (count > 0) --count; };
  const getCount = () => count;
  return { increment, decrement, getCount };
};`,
      },

      // Задание 2: Promise (JS) — student[0], v1 changes_requested
      {
        assignmentId: assignments[1].id as string,
        studentId: students[0].id as string,
        version: 1,
        language: ProgrammingLanguage.JAVASCRIPT,
        status: SubmissionStatus.CHANGES_REQUESTED,
        fileName: 'fetchUser.js',
        filePath: `uploads/${assignments[1].id}/${students[0].id}/v1_fetchUser.js`,
        code: `async function fetchUserData(id) {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  await new Promise(r => setTimeout(r, 100));
  const user = users.find(u => u.id === id);
  return user;
}`,
      },

      // Задание 4: useDebounce (TS) — student[0], v1 pending
      {
        assignmentId: assignments[3].id as string,
        studentId: students[0].id as string,
        version: 1,
        language: ProgrammingLanguage.TYPESCRIPT,
        status: SubmissionStatus.PENDING,
        fileName: 'useDebounce.ts',
        filePath: `uploads/${assignments[3].id}/${students[0].id}/v1_useDebounce.ts`,
        code: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;`,
      },

      // Задание 5: Классы Python — student[1], v1 changes_requested, v2 approved
      {
        assignmentId: assignments[5].id as string,
        studentId: students[1].id as string,
        version: 1,
        language: ProgrammingLanguage.PYTHON,
        status: SubmissionStatus.CHANGES_REQUESTED,
        fileName: 'zoo.py',
        filePath: `uploads/${assignments[5].id}/${students[1].id}/v1_zoo.py`,
        code: `class Animal:
    def __init__(self, name, age, sound):
        self.name = name
        self.age = age
        self.sound = sound
    
    def speak(self):
        print(f'{self.name} говорит: {self.sound}')

class Dog(Animal):
    def __init__(self, name, age):
        super().__init__(name, age, 'Гав!')

class Cat(Animal):
    def __init__(self, name, age):
        super().__init__(name, age, 'Мяу!')

class Bird(Animal):
    def __init__(self, name, age):
        super().__init__(name, age, 'Чирик!')`,
      },
      {
        assignmentId: assignments[5].id as string,
        studentId: students[1].id as string,
        version: 2,
        language: ProgrammingLanguage.PYTHON,
        status: SubmissionStatus.APPROVED,
        fileName: 'zoo.py',
        filePath: `uploads/${assignments[5].id}/${students[1].id}/v2_zoo.py`,
        code: `class Animal:
    def __init__(self, name: str, age: int, sound: str):
        self.name = name
        self.age = age
        self.sound = sound
    
    def speak(self) -> str:
        return f'{self.name} говорит: {self.sound}'
    
    def __str__(self) -> str:
        return f'{self.__class__.__name__}({self.name}, {self.age} лет)'
    
    def __repr__(self) -> str:
        return self.__str__()

class Dog(Animal):
    def __init__(self, name: str, age: int):
        super().__init__(name, age, 'Гав!')

class Cat(Animal):
    def __init__(self, name: str, age: int):
        super().__init__(name, age, 'Мяу!')

class Bird(Animal):
    def __init__(self, name: str, age: int):
        super().__init__(name, age, 'Чирик!')
    
    def fly(self) -> str:
        return f'{self.name} летит!'`,
      },

      // Задание 8: Stack Java — student[3], v1 in_review
      {
        assignmentId: assignments[8].id as string,
        studentId: students[3].id as string,
        version: 1,
        language: ProgrammingLanguage.JAVA,
        status: SubmissionStatus.IN_REVIEW,
        fileName: 'Stack.java',
        filePath: `uploads/${assignments[8].id}/${students[3].id}/v1_Stack.java`,
        code: `import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.Iterator;

public class Stack<T> implements Iterable<T> {
    private final ArrayList<T> data = new ArrayList<>();

    public void push(T item) {
        data.add(item);
    }

    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return data.remove(data.size() - 1);
    }

    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return data.get(data.size() - 1);
    }

    public boolean isEmpty() {
        return data.isEmpty();
    }

    public int size() {
        return data.size();
    }

    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            int index = data.size() - 1;
            public boolean hasNext() { return index >= 0; }
            public T next() { return data.get(index--); }
        };
    }
}`,
      },

      // Задание 10: Merge Sort C++ — student[2], v1 pending
      {
        assignmentId: assignments[10].id as string,
        studentId: students[2].id as string,
        version: 1,
        language: ProgrammingLanguage.CPP,
        status: SubmissionStatus.PENDING,
        fileName: 'merge_sort.cpp',
        filePath: `uploads/${assignments[10].id}/${students[2].id}/v1_merge_sort.cpp`,
        code: `#include <vector>
#include <algorithm>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (int l = 0; l < k; l++) arr[left + l] = temp[l];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`,
      },
    ]);
  }
}
